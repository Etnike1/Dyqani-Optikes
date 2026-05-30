import React from 'react'
import { MESSAGES } from '../../constants/labels.sq'

export default function DataTable({ columns = [], data = [], className = '', emptyMessage = MESSAGES.noRecords }) {
  return (
    <div className={`overflow-hidden overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-card-md ${className}`}>
      <table className="min-w-full border-collapse text-left text-sm">
        <thead className="table-head">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="table-head-cell whitespace-nowrap">
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center text-slate-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={row.key ?? index} className="border-t border-slate-100 transition-colors duration-200 hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-4 align-top text-slate-700">
                    {column.render ? column.render(row) : row[column.dataIndex] ?? '—'}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
