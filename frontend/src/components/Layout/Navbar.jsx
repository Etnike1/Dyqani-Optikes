import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import NotificationDropdown from '../Notifications/NotificationDropdown'
import { fetchNotifications, updateNotification, deleteNotification } from '../../api/notifications'
import { APP_NAME, ACTIONS } from '../../constants/labels.sq'

export default function Navbar({ onMobileMenuClick }) {
  const { user, logout } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const wrapperRef = useRef(null)

  useEffect(() => {
    async function loadNotifications() {
      try {
        const data = await fetchNotifications()
        setNotifications(data || [])
      } catch {
        /* navbar nuk bllokohet */
      }
    }
    loadNotifications()
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  const unreadCount = notifications.filter((item) => !item.lexuar).length

  const handleToggleRead = async (notification) => {
    try {
      const updated = await updateNotification(notification.njoftimId, {
        ...notification,
        lexuar: !notification.lexuar,
      })
      setNotifications((current) =>
        current.map((item) => (item.njoftimId === updated.njoftimId ? updated : item))
      )
    } catch {
      /* */
    }
  }

  const handleDelete = async (notification) => {
    try {
      await deleteNotification(notification.njoftimId)
      setNotifications((current) => current.filter((item) => item.njoftimId !== notification.njoftimId))
    } catch {
      /* */
    }
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-slate-800 bg-slate-900/95 px-4 backdrop-blur md:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMobileMenuClick}
          aria-label="Hap menunë"
          className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-200 md:hidden"
        >
          <span className="text-lg">☰</span>
        </button>
        <Link to="/" className="text-lg font-semibold text-white md:hidden">
          {APP_NAME}
        </Link>
      </div>

      <div className="flex items-center gap-3">
        <div ref={wrapperRef} className="relative">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              setDropdownOpen((value) => !value)
            }}
            aria-expanded={dropdownOpen}
            aria-label={`Njoftimet: ${unreadCount} të palexuara`}
            className="relative rounded-full border border-slate-700 bg-slate-800 p-2 text-slate-200 hover:bg-slate-700"
          >
            <span aria-hidden="true" className="text-lg">
              🔔
            </span>
            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-primary-500 px-1.5 text-[0.65rem] font-semibold text-white">
                {unreadCount}
              </span>
            )}
          </button>
          {dropdownOpen && (
            <NotificationDropdown
              notifications={notifications}
              onToggleRead={handleToggleRead}
              onDelete={handleDelete}
              onClose={() => setDropdownOpen(false)}
            />
          )}
        </div>
        <span className="hidden text-sm text-slate-300 sm:inline">{user?.username}</span>
        <button type="button" onClick={logout} className="text-sm font-medium text-red-400 hover:text-red-300">
          {ACTIONS.logout}
        </button>
      </div>
    </header>
  )
}
