import React from 'react'
import { Link } from 'react-router-dom'
import { ACTIONS, MESSAGES, TABLE } from '../../constants/labels.sq'

export default function PrescriptionTable({ prescriptions = [], onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">{TABLE.number}</th>
            <th className="table-head-cell">{TABLE.customer}</th>
            <th className="table-head-cell">{TABLE.doctor}</th>
            <th className="table-head-cell">{TABLE.date}</th>
            <th className="table-head-cell">PD</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {prescriptions.map((r) => (
            <tr key={r.receteId} className="border-t">
              <td className="px-4 py-3 text-sm text-slate-700">{r.receteId}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{r.klient ? `${r.klient.emri} ${r.klient.mbiemri}` : '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{r.mjekuEmri || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{r.dataRecetes ? new Date(r.dataRecetes).toLocaleDateString('sq-AL') : '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{r.distancaPupilare ?? '—'}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex gap-2">
                  <Link to={`/prescriptions/${r.receteId}`} className="text-primary hover:underline">{ACTIONS.view}</Link>
                  <Link to={`/prescriptions/${r.receteId}`} className="text-slate-700 hover:underline">{ACTIONS.edit}</Link>
                  <button onClick={() => onDelete && onDelete(r)} className="text-red-600 hover:underline">{ACTIONS.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {prescriptions.length === 0 ? (
        <p className="px-4 py-8 text-center text-sm text-slate-500">{MESSAGES.noRecords}</p>
      ) : null}
    </div>
  )
}
