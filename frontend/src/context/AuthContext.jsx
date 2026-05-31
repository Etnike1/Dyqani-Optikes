import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth'
import { userFromAuthResponse, userFromToken } from '../utils/jwt'
import { isAdminRole, isClientRole, isEmployeeRole, normalizeRole } from '../utils/roleUtils'
import { getHomeRoute } from '../utils/routing'
import { registerAuthSessionHandlers } from '../auth/authSession'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

function loadUserFromStorage() {
  const token = localStorage.getItem('accessToken')
  if (!token) return null
  return userFromToken(token)
}

function persistSession(token, refreshToken, userData) {
  localStorage.setItem('accessToken', token)
  if (refreshToken) {
    localStorage.setItem('refreshToken', refreshToken)
  }
  localStorage.setItem('user', JSON.stringify(userData))
  api.defaults.headers.Authorization = `Bearer ${token}`
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(loadUserFromStorage)
  const navigate = useNavigate()

  const clearSession = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    api.defaults.headers.Authorization = null
    setUser(null)
  }

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      const parsed = userFromToken(token)
      if (parsed?.role) {
        setUser(parsed)
        localStorage.setItem('user', JSON.stringify(parsed))
      }
    }

    registerAuthSessionHandlers({
      onTokensRefreshed: (data) => {
        const nextUser = userFromAuthResponse(data)
        persistSession(data.token, data.refreshToken, nextUser)
        setUser(nextUser)
      },
      onSessionExpired: () => {
        clearSession()
        navigate('/login', { replace: true })
      },
    })
  }, [navigate])

  const login = async ({ username, password }) => {
    clearSession()
    const data = await authApi.login({ username, password })
    const nextUser = userFromAuthResponse(data)
    persistSession(data.token, data.refreshToken, nextUser)
    setUser(nextUser)
    return nextUser
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      if (refreshToken) {
        await authApi.logoutRequest(refreshToken)
      }
    } catch {
      /* ignore */
    }
    clearSession()
    navigate('/login')
  }

  const role = normalizeRole(user?.role)

  const isAdmin = () => isAdminRole(role)
  const isEmployee = () => isEmployeeRole(role)
  const isClient = () => isClientRole(role)
  const getDefaultRoute = () => getHomeRoute(role)

  const value = {
    user,
    role,
    login,
    logout,
    isAdmin,
    isEmployee,
    isClient,
    getDefaultRoute,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
