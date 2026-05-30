import React from 'react'
import { Link } from 'react-router-dom'
import NotificationStatusPill from './NotificationStatusPill'
import { ACTIONS, FILTERS, MESSAGES, NOTIFICATIONS } from '../../constants/labels.sq'

export default function NotificationDropdown({
  notifications = [],
  onToggleRead,
  onDelete,
  onClose,
}) {
  const unreadCount = notifications.filter((item) => !item.lexuar).length
  const sorted = [...notifications].sort(
    (a, b) => new Date(b.dataKrijimit) - new Date(a.dataKrijimit)
  )

  return (
    <div role="dialog" aria-label={NOTIFICATIONS.menuLabel} className="absolute right-0 top-full z-30 mt-3 w-96 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl ring-1 ring-slate-200">
      <div className="rounded-t-[32px] bg-slate-950 px-6 py-4 text-white">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{NOTIFICATIONS.title}</p>
            <h3 className="mt-2 text-lg font-semibold">{FILTERS.unreadCount(unreadCount)}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-800/60 bg-slate-900/90 px-3 py-1 text-xs font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
          >
            {ACTIONS.close}
          </button>
        </div>
      </div>
      <div className="max-h-80 overflow-y-auto p-4">
        {sorted.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-600">{MESSAGES.noNotifications}</div>
        ) : (
          sorted.slice(0, 5).map((notification) => (
            <div key={notification.njoftimId} className="group mb-3 rounded-3xl border border-slate-200 bg-slate-50 p-4 last:mb-0 transition hover:bg-slate-100">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-slate-900">{notification.klienti?.emri} {notification.klienti?.mbiemri}</h4>
                    <NotificationStatusPill read={notification.lexuar} />
                  </div>
                  <p className="text-sm text-slate-700">{notification.mesazhi}</p>
                </div>
                <div className="text-right text-xs text-slate-500">{new Date(notification.dataKrijimit).toLocaleDateString('sq-AL')}</div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onToggleRead(notification)}
                  className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700"
                >
                  {notification.lexuar ? ACTIONS.markAsUnread : ACTIONS.markAsRead}
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(notification)}
                  className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-semibold text-red-700"
                >
                  {ACTIONS.delete}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="rounded-b-[32px] border-t border-slate-200 bg-slate-50 p-4 text-center">
        <Link to="/notifications" onClick={onClose} className="inline-flex rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-slate-900">
          {ACTIONS.viewAllNotifications}
        </Link>
      </div>
    </div>
  )
}
