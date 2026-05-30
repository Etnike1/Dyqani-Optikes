import React from 'react'

export default function Table({ columns = [], data = [] }) {
  return (
    <div className="overflow-hidden overflow-auto rounded-lg bg-white shadow">
      <table className="w-full table-auto">
        <thead className="table-head">
          <tr>
            {columns.map(col => (
              <th key={col.key} className="table-head-cell">{col.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              {columns.map(col => (
                <td key={col.key} className="p-2 text-sm">{row[col.dataIndex]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
