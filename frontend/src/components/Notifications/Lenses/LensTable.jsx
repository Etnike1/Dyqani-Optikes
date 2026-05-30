import React from 'react'
import { formatCurrency } from '../../utils/formatCurrency'
import { ACTIONS, TABLE } from '../../constants/labels.sq'

export default function LensTable({ lenses = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">{TABLE.number}</th>
            <th className="table-head-cell">{TABLE.type}</th>
            <th className="table-head-cell">{TABLE.producer}</th>
            <th className="table-head-cell">{TABLE.index}</th>
            <th className="table-head-cell">{TABLE.coating}</th>
            <th className="table-head-cell">{TABLE.price}</th>
            <th className="table-head-cell">{TABLE.stock}</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {lenses.map((l) => (
            <tr key={l.lenteId} className="border-t">
              <td className="px-4 py-3 text-sm text-slate-700">{l.lenteId}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{l.llojiLentes}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{l.prodhuesi || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{l.indeksi || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{l.veshja || '—'}</td>
              <td className="px-4 py-3 text-sm font-medium text-slate-900">{formatCurrency(l.cmimi)}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{l.sasiaStok ?? 0}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <a href={`#/lenses/${l.lenteId}`} className="text-primary hover:underline">{ACTIONS.view}</a>
                  <a href={`#/lenses/${l.lenteId}`} className="text-slate-700 hover:underline">{ACTIONS.edit}</a>
                  <button onClick={() => onDelete && onDelete(l)} className="text-red-600 hover:underline">{ACTIONS.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
