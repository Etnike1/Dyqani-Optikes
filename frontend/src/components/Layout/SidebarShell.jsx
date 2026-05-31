import React from 'react'
import { NavLink } from 'react-router-dom'
import { APP_NAME } from '../../constants/labels.sq'

export const NavItem = ({ to, children, onClick, end = false }) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      `block rounded-2xl px-4 py-2.5 text-sm font-medium transition ${
        isActive
          ? 'bg-primary-600 text-white shadow-sm'
          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
      }`
    }
  >
    {children}
  </NavLink>
)

export default function SidebarShell({ items, subtitle, open = false, onClose = () => {} }) {
  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex h-screen w-72 flex-col overflow-y-auto border-r border-slate-800 bg-slate-900 px-4 py-6 shadow-sidebar transition-transform duration-300 md:w-60 lg:w-64 ${
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
        aria-hidden={!open}
      >
        <div className="mb-6 px-2">
          <div className="text-lg font-semibold tracking-tight text-white">{APP_NAME}</div>
          <p className="mt-1 text-xs text-slate-400">{subtitle}</p>
        </div>
        <nav className="flex-1 space-y-0.5">
          {items.map((item) => (
            <NavItem key={item.to} to={item.to} end={item.end} onClick={onClose}>
              {item.label}
            </NavItem>
          ))}
        </nav>
      </aside>
    </>
  )
}
