import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import DeliveryStatusBadge from './DeliveryStatusBadge'
import { ACTIONS, MESSAGES, TABLE } from '../../constants/labels.sq'

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('sq-AL') : '—')

export default function DeliveryTable({ deliveries = [], onDelete }) {
  const columns = [
    {
      key: 'delivery',
      title: TABLE.delivery,
      render: (delivery) => <span className="font-semibold text-slate-900">#{delivery.dergesaId}</span>,
    },
    {
      key: 'order',
      title: TABLE.order,
      render: (delivery) => <span className="text-sm text-slate-700">#{delivery.porosia?.porosiId}</span>,
    },
    {
      key: 'customer',
      title: TABLE.customer,
      render: (delivery) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{delivery.porosia?.klient?.emri} {delivery.porosia?.klient?.mbiemri}</p>
          <p className="text-sm text-slate-500">{delivery.porosia?.klient?.email ?? MESSAGES.noEmail}</p>
        </div>
      ),
    },
    {
      key: 'schedule',
      title: TABLE.schedule,
      render: (delivery) => (
        <div className="space-y-1 text-sm text-slate-700">
          <div>{formatDate(delivery.dataNisjes)}</div>
          <div>{formatDate(delivery.dataArritjes)}</div>
        </div>
      ),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (delivery) => <DeliveryStatusBadge status={delivery.statusiDergeses} />,
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (delivery) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/deliveries/${delivery.dergesaId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.track}
          </Link>
          <Button type="button" className="bg-red-600 hover:bg-red-700 px-3 py-2 text-xs" onClick={() => onDelete(delivery)}>
            {ACTIONS.cancel}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={deliveries} />
}
