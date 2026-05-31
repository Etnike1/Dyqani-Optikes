import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import RoleBasedLayout from '../components/Layout/RoleBasedLayout'

export default function ProtectedRoute({ children, requiredRoles, bare }) {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (requiredRoles?.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  if (bare) return children
  return <RoleBasedLayout>{children}</RoleBasedLayout>
}
