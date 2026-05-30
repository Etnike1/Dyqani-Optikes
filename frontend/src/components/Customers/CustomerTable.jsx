import React from 'react'
import { Link } from 'react-router-dom'
import DataTable from '../ui/DataTable'
import Button from '../ui/Button'
import { ACTIONS } from '../../constants/labels.sq'

export default function CustomerTable({ customers, onEdit, onDelete }) {
  const columns = [
    {
      key: 'name',
      title: 'emri / mbiemri',
      render: (customer) => (
        <div>
          <p className="font-semibold text-[var(--text)]">
            {customer.emri} {customer.mbiemri}
          </p>
          <p className="text-sm text-[var(--muted)]">{customer.email || '—'}</p>
        </div>
      ),
    },
    { key: 'phone', title: 'telefoni', dataIndex: 'telefoni' },
    {
      key: 'dob',
      title: 'dataLindjes',
      render: (customer) => (customer.dataLindjes ? new Date(customer.dataLindjes).toLocaleDateString('sq-AL') : '—'),
    },
    { key: 'address', title: 'adresa', dataIndex: 'adresa' },
    {
      key: 'actions',
      title: 'Veprime',
      render: (customer) => (
        <div className="flex flex-wrap gap-2">
          <Link to={`/customers/${customer.id}`} className="text-sm text-primary-400 hover:underline">
            {ACTIONS.view}
          </Link>
          <Button type="button" onClick={() => onEdit(customer)} className="px-3 py-2 text-xs">
            {ACTIONS.edit}
          </Button>
          <Button type="button" onClick={() => onDelete(customer)} className="bg-red-600 px-3 py-2 text-xs hover:bg-red-500">
            {ACTIONS.delete}
          </Button>
        </div>
      ),
    },
  ]

  return <DataTable columns={columns} data={customers.map((c) => ({ key: c.id, ...c }))} />
}
