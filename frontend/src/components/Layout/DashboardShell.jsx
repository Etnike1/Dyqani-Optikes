import React from 'react'
import RoleBasedLayout from './RoleBasedLayout'

export default function DashboardShell({ children }) {
  return <RoleBasedLayout>{children}</RoleBasedLayout>
}
