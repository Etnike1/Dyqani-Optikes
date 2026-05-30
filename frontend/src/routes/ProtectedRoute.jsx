import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import DashboardShell from '../components/Layout/DashboardShell'

export default function ProtectedRoute({ children, requiredRoles, bare }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (requiredRoles?.length > 0 && !requiredRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }
  if (bare) return children
  return <DashboardShell>{children}</DashboardShell>
}
