export function decodeJwt(token) {
  if (!token) return null
  try {
    const payload = token.split('.')[1]
    const normalized = payload.replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(normalized)
        .split('')
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

export function extractUserFromToken(token) {
  const claims = decodeJwt(token)
  if (!claims) return null
  return {
    userId: claims.userId,
    username: claims.username ?? claims.sub,
    role: claims.role ?? claims.roles?.[0] ?? null,
  }
}
