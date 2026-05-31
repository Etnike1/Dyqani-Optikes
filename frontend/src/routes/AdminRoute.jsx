import React from 'react'
import { ROLE_ADMIN } from '../constants/roles'
import ProtectedRoute from './ProtectedRoute'

export default function AdminRoute({ children }) {
  return <ProtectedRoute allowedRoles={[ROLE_ADMIN]}>{children}</ProtectedRoute>
}
