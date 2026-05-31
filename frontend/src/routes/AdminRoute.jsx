import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth, homePathForRole } from '../context/AuthContext'
import RoleBasedLayout from '../components/Layout/RoleBasedLayout'

export default function AdminRoute({ children }) {
  const { user, isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to="/login" replace />
  if (user.role !== 'ROLE_ADMIN') return <Navigate to={homePathForRole(user.role)} replace />
  return <RoleBasedLayout>{children}</RoleBasedLayout>
}
