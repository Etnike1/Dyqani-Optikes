import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { ACTIONS, APP_NAME } from '../../constants/labels.sq'
import { CLIENT_NAV, ROLE_LABELS } from './navConfig'
import { NavItem } from './SidebarShell'

export default function ClientNavbar({ onMobileMenuClick, mobileOpen = false, onClose = () => {} }) {
  const { user, logout } = useAuth()
  const roleLabel = ROLE_LABELS[user?.role] ?? user?.role

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={onClose} aria-hidden="false" />
      )}
      <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onMobileMenuClick}
              aria-label="Hap menunë"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 md:hidden"
            >
              <span className="text-lg">☰</span>
            </button>
            <Link to="/store" className="text-lg font-semibold text-white">
              {APP_NAME}
            </Link>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {CLIENT_NAV.map((item) => (
              <NavItem key={item.to} to={item.to}>
                {item.label}
              </NavItem>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-300 sm:inline">{user?.username}</span>
            {roleLabel && (
              <span className="rounded-full bg-primary-600/20 px-2.5 py-0.5 text-xs font-medium text-primary-300">
                {roleLabel}
              </span>
            )}
            <button type="button" onClick={logout} className="text-sm font-medium text-red-400 hover:text-red-300">
              {ACTIONS.logout}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <nav className="space-y-1 border-t border-slate-800 px-4 py-3 md:hidden">
            {CLIENT_NAV.map((item) => (
              <NavItem key={item.to} to={item.to} onClick={onClose}>
                {item.label}
              </NavItem>
            ))}
          </nav>
        )}
      </header>
    </>
  )
}

export function ClientLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

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
      <ClientNavbar
        mobileOpen={mobileOpen}
        onMobileMenuClick={() => setMobileOpen((open) => !open)}
        onClose={() => setMobileOpen(false)}
      />
      <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  )
}
