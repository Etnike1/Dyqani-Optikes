import React from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, STATUS_LABELS, TABLE } from '../../constants/labels.sq'

export default function InventoryTable({ inventory, onEdit, onDelete }) {
  const columns = [
    {
      key: 'product',
      title: TABLE.product,
      render: (item) => (
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">{item.produkt?.emriProduktit}</p>
          <p className="text-sm text-slate-500">{[item.produkt?.marka, item.produkt?.modeli].filter(Boolean).join(' • ') || MESSAGES.noBrandModel}</p>
        </div>
      ),
    },
    {
      key: 'current',
      title: TABLE.current,
      render: (item) => <span className="font-semibold text-slate-900">{Number(item.sasiaAktuale ?? 0)}</span>,
    },
    {
      key: 'minimum',
      title: TABLE.minimum,
      render: (item) => <span className="text-slate-600">{Number(item.sasiaMinimale ?? 0)}</span>,
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (item) => {
        const lowStock = Number(item.sasiaAktuale ?? 0) <= Number(item.sasiaMinimale ?? 0)
        return (
          <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${lowStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
            {lowStock ? STATUS_LABELS.lowStock : STATUS_LABELS.healthy}
          </span>
        )
      },
    },
    {
      key: 'updated',
      title: TABLE.updated,
      render: (item) => item.dataPerditesimit ? new Date(item.dataPerditesimit).toLocaleDateString('sq-AL') : '—',
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (item) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/inventory/${item.inventarId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <Button type="button" onClick={() => onEdit(item)} className="flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs hover:bg-slate-800">
            <Edit3 className="h-4 w-4" />
            {ACTIONS.edit}
          </Button>
          <Button type="button" onClick={() => onDelete(item)} className="flex items-center gap-2 bg-red-600 px-3 py-2 text-xs hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  const rows = inventory.map((item) => ({ key: item.inventarId, ...item }))

  return <DataTable columns={columns} data={rows} />
}
