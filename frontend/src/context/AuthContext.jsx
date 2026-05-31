import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth'
import { extractUserFromToken } from '../utils/jwt'
import { clearAuthStorage, setSessionExpiredHandler } from '../utils/authSession'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

const ROLE_HOME = {
  ROLE_ADMIN: '/dashboard',
  ROLE_EMPLOYEE: '/dashboard',
  ROLE_CLIENT: '/store',
}

export const homePathForRole = (role) => ROLE_HOME[role] ?? '/login'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const navigate = useNavigate()

  const persistUser = useCallback((token, refreshToken, profile) => {
    localStorage.setItem('accessToken', token)
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }
    localStorage.setItem('user', JSON.stringify(profile))
    api.defaults.headers.Authorization = `Bearer ${token}`
    setUser(profile)
  }, [])

  const clearSession = useCallback(() => {
    clearAuthStorage()
    api.defaults.headers.Authorization = null
    setUser(null)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
      const claims = extractUserFromToken(token)
      if (claims?.username && claims?.role) {
        setUser((current) => current ?? claims)
      }
    }
  }, [])

  useEffect(() => {
    setSessionExpiredHandler(() => {
      clearSession()
      navigate('/login', { replace: true })
    })
    return () => setSessionExpiredHandler(null)
  }, [clearSession, navigate])

  const login = async ({ username, password }) => {
    const data = await authApi.login({ username, password })
    const claims = extractUserFromToken(data.token)
    const profile = {
      userId: data.userId ?? claims?.userId,
      username: data.username ?? claims?.username,
      role: data.role ?? claims?.role,
    }
    persistUser(data.token, data.refreshToken, profile)
    return profile
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      if (refreshToken) {
        await authApi.logoutRequest(refreshToken)
      }
    } catch {
      /* best-effort revoke */
    }
    clearSession()
    navigate('/login', { replace: true })
  }

  const value = useMemo(
    () => ({
      user,
      role: user?.role ?? null,
      isAuthenticated: Boolean(user),
      login,
      logout,
      clearSession,
    }),
    [user, login, logout, clearSession]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
