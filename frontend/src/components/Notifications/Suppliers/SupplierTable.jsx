import React from 'react'
import { Link } from 'react-router-dom'
import { ACTIONS, TABLE } from '../../constants/labels.sq'

export default function SupplierTable({ suppliers = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">{TABLE.number}</th>
            <th className="table-head-cell">{TABLE.company}</th>
            <th className="table-head-cell">{TABLE.contact}</th>
            <th className="table-head-cell">{TABLE.phone}</th>
            <th className="table-head-cell">{TABLE.email}</th>
            <th className="table-head-cell">{TABLE.products}</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((s) => (
            <tr key={s.furnitorId} className="border-t">
              <td className="px-4 py-3 text-sm text-slate-700">{s.furnitorId}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{s.emriKompanise}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{s.personiKontaktit || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{s.telefoni || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{s.email || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{s.produktetFurnizuara || '—'}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Link to={`/suppliers/${s.furnitorId}`} className="text-primary hover:underline">{ACTIONS.view}</Link>
                  <Link to={`/suppliers/${s.furnitorId}`} className="text-slate-700 hover:underline">{ACTIONS.edit}</Link>
                  <button onClick={() => onDelete && onDelete(s)} className="text-red-600 hover:underline">{ACTIONS.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
