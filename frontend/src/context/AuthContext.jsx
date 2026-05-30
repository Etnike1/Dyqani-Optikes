import React, { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'
import { useNavigate } from 'react-router-dom'
import * as authApi from '../api/auth'

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) api.defaults.headers.Authorization = `Bearer ${token}`
  }, [])

  const login = async ({ username, password }) => {
    const data = await authApi.login({ username, password })
    // JwtResponse contains token, refreshToken, username, role
    localStorage.setItem('accessToken', data.token)
    localStorage.setItem('refreshToken', data.refreshToken)
    const u = { username: data.username, role: data.role }
    localStorage.setItem('user', JSON.stringify(u))
    api.defaults.headers.Authorization = `Bearer ${data.token}`
    setUser(u)
    return u
  }

  const logout = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    try {
      await authApi.logoutRequest(refreshToken)
    } catch (e) {
      // ignore
    }
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    api.defaults.headers.Authorization = null
    setUser(null)
    navigate('/login')
  }

  const value = { user, login, logout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
