import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, TABLE } from '../../constants/labels.sq'

const formatDate = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('sq-AL')
}

const statusStyles = {
  'Ne pritje': 'bg-amber-100 text-amber-700',
  Konfirmuar: 'bg-emerald-100 text-emerald-700',
  'E perfunduar': 'bg-slate-100 text-slate-700',
  Anuluar: 'bg-red-100 text-red-700',
}

export default function ReservationTable({ reservations = [], onDelete }) {
  const columns = [
    {
      key: 'reservation',
      title: TABLE.reservation,
      render: (reservation) => <span className="font-semibold text-slate-900">#{reservation.rezervimId}</span>,
    },
    {
      key: 'customer',
      title: TABLE.customer,
      render: (reservation) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{reservation.klienti?.emri} {reservation.klienti?.mbiemri}</p>
          <p className="text-sm text-slate-500">{reservation.klienti?.email ?? MESSAGES.noEmail}</p>
        </div>
      ),
    },
    {
      key: 'employee',
      title: TABLE.employee,
      render: (reservation) => <span className="text-sm text-slate-700">{reservation.punonjesi ? `${reservation.punonjesi.emri} ${reservation.punonjesi.mbiemri}` : MESSAGES.unassigned}</span>,
    },
    {
      key: 'schedule',
      title: TABLE.schedule,
      render: (reservation) => (
        <div className="space-y-1 text-sm text-slate-700">
          <div>{formatDate(reservation.dataRezervimit)}</div>
          <div>{reservation.oraRezervimit || '—'}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (reservation) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[reservation.statusi] ?? 'bg-slate-100 text-slate-700'}`}>
          {reservation.statusi || 'Ne pritje'}
        </span>
      ),
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (reservation) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/reservations/${reservation.rezervimId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <Button type="button" onClick={() => onDelete(reservation)} className="bg-red-600 hover:bg-red-700 px-3 py-2 text-xs">
            {ACTIONS.cancel}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={reservations} />
}
