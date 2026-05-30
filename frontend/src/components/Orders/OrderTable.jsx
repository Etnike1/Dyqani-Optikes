import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, STATUS_LABELS, TABLE } from '../../constants/labels.sq'

import { formatCurrency } from '../../utils/formatCurrency'

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('sq-AL')
}

export default function OrderTable({ orders, onDelete }) {
  const columns = [
    {
      key: 'order',
      title: TABLE.order,
      render: (order) => <span className="font-semibold text-slate-900">#{order.porosiId}</span>,
    },
    {
      key: 'customer',
      title: TABLE.customer,
      render: (order) => (
        <div className="space-y-1">
          <p className="font-medium text-slate-900">{order.klient?.emri} {order.klient?.mbiemri}</p>
          <p className="text-sm text-slate-500">{order.klient?.email ?? MESSAGES.noEmail}</p>
        </div>
      ),
    },
    {
      key: 'total',
      title: TABLE.total,
      render: (order) => <span className="font-semibold text-slate-900">{formatCurrency(order.totali)}</span>,
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (order) => (
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
          {order.statusi || STATUS_LABELS.pending}
        </span>
      ),
    },
    {
      key: 'date',
      title: TABLE.ordered,
      render: (order) => formatDate(order.dataPorosise),
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (order) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/orders/${order.porosiId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <Button
            type="button"
            onClick={() => onDelete(order)}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 text-xs"
          >
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={orders} />
}
