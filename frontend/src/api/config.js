/** Backend origin without trailing slash (e.g. http://localhost:8080) */
export const API_ROOT = (import.meta.env.VITE_API_BASE || 'http://localhost:8080').replace(/\/$/, '')

/** Axios base URL — Spring controllers are under /api/* */
export const API_BASE = `${API_ROOT}/api`

export const AUTH_PATH = '/auth'
export const USERS_PATH = '/users'
