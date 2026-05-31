import { ROLE_ADMIN, ROLE_CLIENT, ROLE_EMPLOYEE } from '../constants/roles'
import { isClientRole, normalizeRole } from './roleUtils'

export function getHomeRoute(role) {
  if (isClientRole(role)) return '/store'
  return '/dashboard'
}

export function getUnauthorizedRedirect(role) {
  const normalized = normalizeRole(role)
  if (normalized === ROLE_CLIENT) return '/store'
  if (normalized === ROLE_EMPLOYEE) return '/dashboard'
  if (normalized === ROLE_ADMIN) return '/dashboard'
  return '/login'
}

export function hasAnyRole(userRole, allowedRoles) {
  const normalized = normalizeRole(userRole)
  return allowedRoles.some((allowed) => normalizeRole(allowed) === normalized)
}
