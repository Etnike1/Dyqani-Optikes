import { normalizeRole, resolvePrimaryRole } from './roleUtils'

export function decodeJwtPayload(token) {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

function collectRolesFromPayload(payload) {
  const rawRoles = payload.roles
  const fromArray = Array.isArray(rawRoles) ? rawRoles : rawRoles ? [rawRoles] : []
  const fromRoleClaim = payload.role
    ? Array.isArray(payload.role)
      ? payload.role
      : [payload.role]
    : []
  return [...fromArray, ...fromRoleClaim]
}

/** Build user state from JWT — token claims always win over stale localStorage fallback. */
export function userFromToken(token, fallback = {}) {
  const payload = decodeJwtPayload(token)

  if (!payload) {
    if (!fallback.username && !fallback.role) return null
    const role = resolvePrimaryRole(fallback.role, fallback.roles)
    return {
      userId: fallback.userId ?? null,
      username: fallback.username ?? '',
      role,
      roles: role ? [role] : [],
    }
  }

  const allRoles = collectRolesFromPayload(payload)
  const role = resolvePrimaryRole(null, allRoles)

  return {
    userId: payload.userId ?? fallback.userId ?? null,
    username: payload.username ?? payload.sub ?? fallback.username ?? '',
    role,
    roles: [...new Set(allRoles.map(normalizeRole).filter(Boolean))],
  }
}

/** Merge API login/refresh response with decoded JWT (response role included in resolution). */
export function userFromAuthResponse(data) {
  const fromToken = userFromToken(data.token) || {}
  const responseRoles = data.role ? [data.role, ...(fromToken.roles || [])] : fromToken.roles
  const role = resolvePrimaryRole(data.role, responseRoles)

  return {
    userId: data.userId ?? fromToken.userId ?? null,
    username: data.username ?? fromToken.username ?? '',
    role,
    roles: [...new Set((responseRoles || []).map(normalizeRole).filter(Boolean))],
  }
}
