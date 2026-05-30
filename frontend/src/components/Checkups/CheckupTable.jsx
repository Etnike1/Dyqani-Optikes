import React from 'react'
import { Link } from 'react-router-dom'
import { ACTIONS, MESSAGES, TABLE } from '../../constants/labels.sq'

export default function CheckupTable({ checkups = [], onDelete }) {
  return (
    <div className="overflow-hidden overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-card-md">
      <table className="w-full min-w-[720px] table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">ID</th>
            <th className="table-head-cell">{TABLE.patient}</th>
            <th className="table-head-cell">{TABLE.employee}</th>
            <th className="table-head-cell">{TABLE.date}</th>
            <th className="table-head-cell">{TABLE.prescription}</th>
            <th className="table-head-cell">{TABLE.notes}</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {checkups.map((item) => (
            <tr key={item.kontrollId} className="border-t last:border-b">
              <td className="px-4 py-3 text-sm text-slate-700">{item.kontrollId}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.klient ? `${item.klient.emri} ${item.klient.mbiemri}` : '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.punonjesi ? `${item.punonjesi.emri} ${item.punonjesi.mbiemri}` : '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.dataKontrollit || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{item.receteId || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700 line-clamp-2 max-w-xs">{item.rezultati || MESSAGES.noMeasurementDetails}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <Link to={`/checkups/${item.kontrollId}`} className="text-primary hover:underline">{ACTIONS.view}</Link>
                  <button type="button" onClick={() => onDelete && onDelete(item)} className="text-red-600 hover:underline">{ACTIONS.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
