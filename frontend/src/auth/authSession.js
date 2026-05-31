let sessionHandlers = {
  onTokensRefreshed: () => {},
  onSessionExpired: () => {},
}

export function registerAuthSessionHandlers(handlers) {
  sessionHandlers = { ...sessionHandlers, ...handlers }
}

export function notifyTokensRefreshed(data) {
  sessionHandlers.onTokensRefreshed(data)
}

export function notifySessionExpired() {
  sessionHandlers.onSessionExpired()
}
