import React, { useEffect, useMemo, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_EMPLOYEE } from '../../constants/roles'
import { normalizeRole } from '../../utils/roleUtils'
import Navbar from './Navbar'
import AdminSidebar from './AdminSidebar'
import EmployeeSidebar from './EmployeeSidebar'
import ClientSidebar from './ClientSidebar'

function resolveSidebar(role) {
  switch (normalizeRole(role)) {
    case ROLE_ADMIN:
      return AdminSidebar
    case ROLE_EMPLOYEE:
      return EmployeeSidebar
    case ROLE_CLIENT:
      return ClientSidebar
    default:
      return null
  }
}

export default function RoleBasedLayout({ children }) {
  const { user, role } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const effectiveRole = normalizeRole(role ?? user?.role)

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }, [])

  const SidebarComponent = useMemo(() => resolveSidebar(effectiveRole), [effectiveRole])

  const sidebarProps = {
    open: sidebarOpen,
    onClose: () => setSidebarOpen(false),
  }

  if (!SidebarComponent) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="app-shell min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <SidebarComponent key={effectiveRole} {...sidebarProps} />
      <div className="flex min-h-screen flex-col md:pl-60 lg:pl-64">
        <Navbar onMobileMenuClick={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-5">{children}</main>
      </div>
    </div>
  )
}
