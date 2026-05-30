import React from 'react'
import { Link } from 'react-router-dom'
import PaymentStatusBadge from './PaymentStatusBadge'
import { ACTIONS, TABLE } from '../../constants/labels.sq'
import { formatCurrency } from '../../utils/formatCurrency'

export default function PaymentTable({ payments = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">{TABLE.number}</th>
            <th className="table-head-cell">{TABLE.order}</th>
            <th className="table-head-cell">{TABLE.customer}</th>
            <th className="table-head-cell">{TABLE.amount}</th>
            <th className="table-head-cell">{TABLE.method}</th>
            <th className="table-head-cell">{TABLE.status}</th>
            <th className="table-head-cell">{TABLE.date}</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-3 text-sm text-slate-700">{p.id}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{p.porosia?.porosiId ?? '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{p.porosia?.klient ? `${p.porosia.klient.emri} ${p.porosia.klient.mbiemri}` : '—'}</td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(p.shuma)}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{p.metodaPageses}</td>
              <td className="px-4 py-3 text-sm"><PaymentStatusBadge status={p.statusi} /></td>
              <td className="px-4 py-3 text-sm text-slate-700">{p.dataPageses ? new Date(p.dataPageses).toLocaleString('sq-AL') : '—'}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Link to={`/payments/${p.id}`} className="text-primary hover:underline">{ACTIONS.view}</Link>
                  <button
                    onClick={() => onDelete && onDelete(p)}
                    className="text-red-600 hover:underline"
                  >
                    {ACTIONS.delete}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
