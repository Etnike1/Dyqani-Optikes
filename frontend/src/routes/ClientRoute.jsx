import React from 'react'
import { ROLE_CLIENT } from '../constants/roles'
import ProtectedRoute from './ProtectedRoute'

export default function ClientRoute({ children }) {
  return <ProtectedRoute allowedRoles={[ROLE_CLIENT]}>{children}</ProtectedRoute>
}
