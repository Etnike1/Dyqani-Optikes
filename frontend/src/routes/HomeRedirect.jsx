import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getHomeRoute } from '../utils/routing'
import { normalizeRole } from '../utils/roleUtils'

export default function HomeRedirect() {
  const { user, role } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return <Navigate to={getHomeRoute(normalizeRole(role ?? user.role))} replace />
}
