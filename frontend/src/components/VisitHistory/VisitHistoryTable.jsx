import React from 'react'
import { Link } from 'react-router-dom'
import { klientLabel } from '../../utils/entityRefs'
import { ACTIONS } from '../../constants/labels.sq'
import Button from '../ui/Button'

export default function VisitHistoryTable({ items = [], onEdit, onDelete }) {
  if (!items.length) {
    return <p className="panel text-sm text-[var(--muted)]">Nuk ka regjistrime historiku vizite.</p>
  }

  return (
    <div className="panel overflow-hidden overflow-x-auto p-0">
      <table className="table-base">
        <thead>
          <tr>
            <th>historikuId</th>
            <th>Klienti</th>
            <th>dataVizites</th>
            <th>kontrolli</th>
            <th>pershkrimi</th>
            <th className="table-head-cell text-right">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {items.map((row) => (
            <tr key={row.historikuId}>
              <td>
                <Link to={`/visit-history/${row.historikuId}`} className="font-medium text-primary-400 hover:underline">
                  #{row.historikuId}
                </Link>
              </td>
              <td>{klientLabel(row.klienti)}</td>
              <td>{row.dataVizites ?? '—'}</td>
              <td>{row.kontrolli?.kontrollId ? `#${row.kontrolli.kontrollId}` : '—'}</td>
              <td className="max-w-xs truncate">{row.pershkrimi ?? '—'}</td>
              <td className="text-right">
                <div className="flex justify-end gap-2">
                  {onEdit && (
                    <Button type="button" variant="ghost" className="text-xs" onClick={() => onEdit(row)}>
                      {ACTIONS.edit}
                    </Button>
                  )}
                  {onDelete && (
                    <Button type="button" className="bg-red-600 text-xs hover:bg-red-500" onClick={() => onDelete(row)}>
                      {ACTIONS.delete}
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
