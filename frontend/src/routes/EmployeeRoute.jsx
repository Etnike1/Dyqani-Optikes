import React from 'react'
import { STAFF_ROLES } from '../constants/roles'
import ProtectedRoute from './ProtectedRoute'

export default function EmployeeRoute({ children }) {
  return <ProtectedRoute allowedRoles={STAFF_ROLES}>{children}</ProtectedRoute>
}
