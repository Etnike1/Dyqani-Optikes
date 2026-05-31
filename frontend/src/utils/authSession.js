let onSessionExpired = null

export function setSessionExpiredHandler(handler) {
  onSessionExpired = handler
}

export function notifySessionExpired() {
  if (onSessionExpired) {
    onSessionExpired()
  } else {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }
}

export function clearAuthStorage() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}
