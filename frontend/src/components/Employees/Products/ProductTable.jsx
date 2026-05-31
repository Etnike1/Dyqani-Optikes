import React from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, STATUS_LABELS, TABLE } from '../../constants/labels.sq'
import { formatCurrency } from '../../utils/formatCurrency'

export default function ProductTable({ products, onEdit, onDelete }) {
  const columns = [
    {
      key: 'product',
      title: TABLE.product,
      render: (product) => (
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">{product.emriProduktit}</p>
          <p className="text-sm text-slate-500">
            {[product.marka, product.modeli].filter(Boolean).join(' • ') || MESSAGES.noBrandModel}
          </p>
        </div>
      ),
    },
    {
      key: 'category',
      title: TABLE.category,
      render: (product) => product.kategori?.emriKategorise ?? MESSAGES.uncategorized,
    },
    {
      key: 'price',
      title: TABLE.price,
      render: (product) => {
        if (product.cmimi == null) return '—'
        return formatCurrency(product.cmimi)
      },
    },
    {
      key: 'stock',
      title: TABLE.stock,
      render: (product) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${Number(product.sasiaStok) <= 5 ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
          {STATUS_LABELS.inStock(Number(product.sasiaStok))}
        </span>
      ),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (product) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.aktiv ? 'bg-slate-100 text-slate-700' : 'bg-slate-900/5 text-slate-600'}`}>
          {product.aktiv ? STATUS_LABELS.active : STATUS_LABELS.inactive}
        </span>
      ),
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (product) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/products/${product.produktId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.view}
          </Link>
          <Button type="button" onClick={() => onEdit(product)} className="flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs hover:bg-slate-800">
            <Edit3 className="h-4 w-4" />
            {ACTIONS.edit}
          </Button>
          <Button type="button" onClick={() => onDelete(product)} className="flex items-center gap-2 bg-red-600 px-3 py-2 text-xs hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  const rows = products.map((product) => ({ key: product.produktId, ...product }))

  return <DataTable columns={columns} data={rows} />
}
