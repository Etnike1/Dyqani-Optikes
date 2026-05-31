import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RoleBasedLayout from '../components/Layout/RoleBasedLayout'
import { getHomeRoute, getUnauthorizedRedirect, hasAnyRole } from '../utils/routing'
import { isClientRole, normalizeRole } from '../utils/roleUtils'

const STAFF_PATH_PREFIXES = [
  '/dashboard',
  '/admin',
  '/customers',
  '/categories',
  '/products',
  '/inventory',
  '/orders',
  '/payments',
  '/prescriptions',
  '/checkups',
  '/visit-history',
  '/reservations',
  '/notifications',
  '/warranties',
  '/deliveries',
  '/lenses',
  '/employees',
  '/suppliers',
]

export default function ProtectedRoute({ children, allowedRoles, bare }) {
  const { user, role } = useAuth()
  const location = useLocation()

  if (!user || !normalizeRole(role ?? user.role)) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  const effectiveRole = normalizeRole(role ?? user.role)

  if (allowedRoles?.length > 0 && !hasAnyRole(effectiveRole, allowedRoles)) {
    return <Navigate to={getUnauthorizedRedirect(effectiveRole)} replace />
  }

  if (isClientRole(effectiveRole)) {
    const path = location.pathname
    const isStaffPath = path === '/' || STAFF_PATH_PREFIXES.some((prefix) => path.startsWith(prefix))
    if (isStaffPath) {
      return <Navigate to={getHomeRoute(effectiveRole)} replace />
    }
  }

  if (bare) return children
  return <RoleBasedLayout>{children}</RoleBasedLayout>
}
