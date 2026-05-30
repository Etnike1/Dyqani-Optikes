import axios from 'axios'
import { API_BASE, AUTH_PATH } from './config'

const authUrl = (path) => `${API_BASE}${AUTH_PATH}${path}`

export async function login(credentials) {
  const res = await axios.post(authUrl('/login'), credentials)
  return res.data
}

export async function register(payload) {
  const res = await axios.post(authUrl('/register'), payload)
  return res.data
}

export async function refreshToken(refreshToken) {
  const res = await axios.post(authUrl('/refresh'), { refreshToken })
  return res.data
}

export async function logoutRequest(refreshToken) {
  const res = await axios.post(authUrl('/logout'), { refreshToken })
  return res.data
}
