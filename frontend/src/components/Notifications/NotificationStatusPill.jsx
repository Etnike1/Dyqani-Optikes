import React from 'react'

export default function NotificationStatusPill({ read }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        read ? 'bg-slate-100 text-slate-700' : 'bg-primary text-white'
      }`}
    >
      {read ? 'Read' : 'Unread'}
    </span>
  )
}
