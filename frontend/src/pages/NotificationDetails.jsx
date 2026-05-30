import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import NotificationStatusPill from '../components/Notifications/NotificationStatusPill'
import { useToast } from '../components/ui/ToastProvider'
import { fetchNotification, updateNotification, deleteNotification } from '../api/notifications'
import { ACTIONS, DETAIL, FIELD, MESSAGES, NAV } from '../constants/labels.sq'

export default function NotificationDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [notification, setNotification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const result = await fetchNotification(id)
        setNotification(result)
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, notify])

  const handleToggleRead = async () => {
    if (!notification) return
    try {
      setSaving(true)
      const updated = await updateNotification(notification.njoftimId, {
        ...notification,
        lexuar: !notification.lexuar,
      })
      setNotification(updated)
      notify(MESSAGES.saveSuccess)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!notification) return
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return

    try {
      await deleteNotification(notification.njoftimId)
      notify(MESSAGES.deleteSuccess)
      navigate('/notifications')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) {
    return (
      <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>
    )
  }

  if (!notification) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <p className="text-slate-500">{DETAIL.notFound}</p>
        </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.njoftimet}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Njoftimi #{notification.njoftimId}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Shikoni mesazhin, klientin dhe statusin e leximit.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/notifications" className="rounded-3xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {ACTIONS.back}
              </Link>
              <button
                onClick={handleDelete}
                className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                {ACTIONS.delete}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <div className="space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.message}</p>
                <p className="mt-3 text-lg leading-7 text-slate-800">{notification.mesazhi}</p>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.customer}</p>
                  <p className="text-sm text-slate-700">{notification.klienti?.emri} {notification.klienti?.mbiemri}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.created}</p>
                  <p className="text-sm text-slate-700">{new Date(notification.dataKrijimit).toLocaleString('en-GB')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <div className="space-y-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.status}</p>
                <NotificationStatusPill read={notification.lexuar} />
              </div>
              <button
                type="button"
                onClick={handleToggleRead}
                disabled={saving}
                className="w-full rounded-3xl bg-primary px-4 py-3 text-sm font-semibold text-white hover:bg-primary-dark disabled:opacity-50"
              >
                {notification.lexuar ? DETAIL.markAsUnread : DETAIL.markAsRead}
              </button>
            </div>
          </div>
        </div>
      </div>
  )
}
