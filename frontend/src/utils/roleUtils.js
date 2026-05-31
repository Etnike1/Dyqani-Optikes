import { ROLE_ADMIN, ROLE_CLIENT, ROLE_EMPLOYEE } from '../constants/roles'

const ROLE_PRIORITY = [ROLE_ADMIN, ROLE_EMPLOYEE, ROLE_CLIENT]

/** Normalize backend role strings to ROLE_* format. */
export function normalizeRole(role) {
  if (role == null || role === '') return null
  const value = String(role).trim()
  if (!value) return null
  if (value.startsWith('ROLE_')) return value
  const upper = value.toUpperCase()
  if (upper === 'ADMIN') return ROLE_ADMIN
  if (upper === 'EMPLOYEE') return ROLE_EMPLOYEE
  if (upper === 'CLIENT') return ROLE_CLIENT
  return `ROLE_${upper}`
}

/** Pick the highest-privilege role when JWT carries multiple roles. */
export function resolvePrimaryRole(role, roles = []) {
  const collected = [
    normalizeRole(role),
    ...(Array.isArray(roles) ? roles.map(normalizeRole) : []),
  ].filter(Boolean)

  const unique = [...new Set(collected)]
  for (const candidate of ROLE_PRIORITY) {
    if (unique.includes(candidate)) return candidate
  }
  return unique[0] || null
}

export function isAdminRole(role) {
  return normalizeRole(role) === ROLE_ADMIN
}

export function isEmployeeRole(role) {
  return normalizeRole(role) === ROLE_EMPLOYEE
}

export function isClientRole(role) {
  return normalizeRole(role) === ROLE_CLIENT
}

export function isStaffRole(role) {
  const normalized = normalizeRole(role)
  return normalized === ROLE_ADMIN || normalized === ROLE_EMPLOYEE
}
