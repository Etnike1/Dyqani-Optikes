import axios from 'axios'
import { API_BASE } from './config'
import { refreshToken as refreshTokenApi } from './auth'
import { userFromAuthResponse, userFromToken } from '../utils/jwt'
import { notifySessionExpired, notifyTokensRefreshed } from '../auth/authSession'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

const isAuthEndpoint = (url = '') => url.includes('/auth/')

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
    const status = err.response?.status

    if (!original || status !== 401 || original._retry || isAuthEndpoint(original.url)) {
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

    const storedRefreshToken = localStorage.getItem('refreshToken')
    if (!storedRefreshToken) {
      notifySessionExpired()
      return Promise.reject(err)
    }

    try {
      const data = await refreshTokenApi(storedRefreshToken)
      persistRefreshedTokens(data)
      notifyTokensRefreshed(data)
      processQueue(null, data.token)
      original.headers.Authorization = `Bearer ${data.token}`
      return api(original)
    } catch (refreshError) {
      processQueue(refreshError, null)
      notifySessionExpired()
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

function persistRefreshedTokens(data) {
  localStorage.setItem('accessToken', data.token)
  if (data.refreshToken) {
    localStorage.setItem('refreshToken', data.refreshToken)
  }
  const parsed = userFromAuthResponse(data)
  localStorage.setItem('user', JSON.stringify(parsed))
  api.defaults.headers.Authorization = `Bearer ${data.token}`
}

export default api
