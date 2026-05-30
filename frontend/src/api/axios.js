import axios from 'axios'
import { API_BASE } from './config'
import { refreshToken as refreshTokenApi } from './auth'

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' }
})

// Request interceptor to attach token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Response interceptor to catch 401 and attempt refresh
let isRefreshing = false
let pendingRequests = []

const processQueue = (error, token = null) => {
  pendingRequests.forEach(prom => (error ? prom.reject(error) : prom.resolve(token)))
  pendingRequests = []
}

api.interceptors.response.use(
  res => res,
  async err => {
    const original = err.config
    if (err.response && err.response.status === 401 && !original._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push({ resolve, reject })
        }).then(token => {
          original.headers.Authorization = `Bearer ${token}`
          return axios(original)
        })
      }

      original._retry = true
      isRefreshing = true
      const refreshToken = localStorage.getItem('refreshToken')
      try {
        const r = await refreshTokenApi(refreshToken)
        const { token } = r
        localStorage.setItem('accessToken', token)
        api.defaults.headers.Authorization = `Bearer ${token}`
        processQueue(null, token)
        return api(original)
      } catch (e) {
        processQueue(e, null)
        // fallback: clear storage
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        return Promise.reject(e)
      } finally {
        isRefreshing = false
      }
    }
    return Promise.reject(err)
  }
)

export default api
