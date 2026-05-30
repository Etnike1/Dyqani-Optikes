import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import WarrantyStatusBadge from './WarrantyStatusBadge'
import { ACTIONS, MESSAGES, TABLE } from '../../constants/labels.sq'

const formatDate = (value) => (value ? new Date(value).toLocaleDateString('sq-AL') : '—')

export default function WarrantyTable({ warranties = [], onDelete }) {
  const columns = [
    {
      key: 'warranty',
      title: TABLE.warranty,
      render: (item) => <span className="font-semibold text-slate-900">#{item.garanciaId}</span>,
    },
    {
      key: 'customer',
      title: TABLE.customer,
      render: (item) => <span className="text-sm text-slate-700">{item.klienti?.emri} {item.klienti?.mbiemri}</span>,
    },
    {
      key: 'item',
      title: TABLE.productLens,
      render: (item) => (
        <div className="space-y-1 text-sm text-slate-700">
          <div>{item.produkti?.emri || item.lentet?.emri || MESSAGES.unknownItem}</div>
          <div className="text-slate-500">{item.produkti ? TABLE.product : item.lentet ? TABLE.lens : '—'}</div>
        </div>
      ),
    },
    {
      key: 'expires',
      title: TABLE.expires,
      render: (item) => formatDate(item.dataSkadimit),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (item) => <WarrantyStatusBadge dataSkadimit={item.dataSkadimit} />,
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/warranties/${item.garanciaId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <Button type="button" className="bg-red-600 hover:bg-red-700 px-3 py-2 text-xs" onClick={() => onDelete(item)}>
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={warranties} />
}
