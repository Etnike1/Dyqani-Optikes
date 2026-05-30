import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function DashboardShell({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.classList.add('dark')
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.classList.remove('dark')
    }
  }, [])

  return (
    <div className="app-shell min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex min-h-screen flex-col md:pl-60 lg:pl-64">
        <Navbar onMobileMenuClick={() => setSidebarOpen((open) => !open)} />
        <main className="flex-1 px-4 py-4 sm:px-6 sm:py-5">
          {children}
        </main>
      </div>
    </div>
  )
}
