import React from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, STATUS_LABELS, TABLE } from '../../constants/labels.sq'

export default function CategoryTable({ categories, onEdit, onDelete }) {
  const columns = [
    {
      key: 'name',
      title: TABLE.category,
      render: (category) => (
        <div className="space-y-1">
          <p className="font-semibold text-slate-900">{category.emriKategorise}</p>
          <p className="text-sm text-slate-500">{category.pershkrimi || MESSAGES.noDescription}</p>
        </div>
      ),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (category) => (
        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${category.aktive ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
          {category.aktive ? STATUS_LABELS.active : STATUS_LABELS.inactive}
        </span>
      ),
    },
    {
      key: 'actions',
      title: TABLE.actions,
      render: (category) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/categories/${category.kategoriId}`} className="text-sm font-medium text-primary hover:underline">
            {ACTIONS.details}
          </Link>
          <Button type="button" onClick={() => onEdit(category)} className="flex items-center gap-2 bg-slate-900 px-3 py-2 text-xs hover:bg-slate-800">
            <Edit3 className="h-4 w-4" />
            {ACTIONS.edit}
          </Button>
          <Button type="button" onClick={() => onDelete(category)} className="flex items-center gap-2 bg-red-600 px-3 py-2 text-xs hover:bg-red-700">
            <Trash2 className="h-4 w-4" />
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  const rows = categories.map((category) => ({ key: category.kategoriId, ...category }))

  return <DataTable columns={columns} data={rows} />
}
