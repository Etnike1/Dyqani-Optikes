import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import NotificationStatusPill from './NotificationStatusPill'
import { ACTIONS, FILTERS, MESSAGES, TABLE } from '../../constants/labels.sq'

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('sq-AL') : '—')

export default function NotificationTable({ notifications = [], onToggleRead, onDelete }) {
  const columns = [
    {
      key: 'message',
      title: TABLE.message,
      render: (notification) => <p className="text-sm text-slate-900">{notification.mesazhi}</p>,
    },
    {
      key: 'customer',
      title: TABLE.customer,
      render: (notification) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{notification.klienti?.emri} {notification.klienti?.mbiemri}</p>
          <p className="text-sm text-slate-500">{notification.klienti?.email ?? MESSAGES.noEmail}</p>
        </div>
      ),
    },
    {
      key: 'created',
      title: TABLE.created,
      render: (notification) => formatDate(notification.dataKrijimit),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (notification) => <NotificationStatusPill read={notification.lexuar} />,
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (notification) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/notifications/${notification.njoftimId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <button
            type="button"
            onClick={() => onToggleRead(notification)}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700"
          >
            {notification.lexuar ? FILTERS.unread : FILTERS.read}
          </button>
          <Button type="button" className="bg-red-600 hover:bg-red-700 px-3 py-2 text-xs" onClick={() => onDelete(notification)}>
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={notifications} />
}
