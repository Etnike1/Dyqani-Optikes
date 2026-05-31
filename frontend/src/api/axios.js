import axios from 'axios'
import { API_BASE } from './config'
import { refreshToken as refreshTokenApi } from './auth'
import { notifySessionExpired } from '../utils/authSession'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

let isRefreshing = false
let pendingRequests = []

const processQueue = (error, token = null) => {
  pendingRequests.forEach((prom) => (error ? prom.reject(error) : prom.resolve(token)))
  pendingRequests = []
}

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config
    if (!original || err.response?.status !== 401 || original._retry) {
      return Promise.reject(err)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        pendingRequests.push({ resolve, reject })
      }).then((token) => {
        original.headers.Authorization = `Bearer ${token}`
        return api(original)
      })
    }

    original._retry = true
    isRefreshing = true

    const refreshToken = localStorage.getItem('refreshToken')
    if (!refreshToken) {
      isRefreshing = false
      notifySessionExpired()
      return Promise.reject(err)
    }

    try {
      const data = await refreshTokenApi(refreshToken)
      const { token } = data
      localStorage.setItem('accessToken', token)
      api.defaults.headers.Authorization = `Bearer ${token}`
      processQueue(null, token)
      original.headers.Authorization = `Bearer ${token}`
      return api(original)
    } catch (refreshError) {
      processQueue(refreshError, null)
      const status = refreshError.response?.status
      if (status === 400 || status === 403 || !status) {
        notifySessionExpired()
      }
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
