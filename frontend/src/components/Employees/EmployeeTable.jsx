import React from 'react'
import { Link } from 'react-router-dom'
import EmployeeRoleBadge from './EmployeeRoleBadge'
import { ACTIONS, STATUS_LABELS, TABLE } from '../../constants/labels.sq'

export default function EmployeeTable({ employees = [], onDelete }) {
  return (
    <div className="overflow-hidden overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-card-md">
      <table className="w-full min-w-[680px] table-auto">
        <thead className="table-head">
          <tr>
            <th className="table-head-cell">{TABLE.number}</th>
            <th className="table-head-cell">{TABLE.name}</th>
            <th className="table-head-cell">{TABLE.role}</th>
            <th className="table-head-cell">{TABLE.email}</th>
            <th className="table-head-cell">{TABLE.phone}</th>
            <th className="table-head-cell">{TABLE.status}</th>
            <th className="table-head-cell">{TABLE.actions}</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.punonjesId} className="border-t last:border-b">
              <td className="px-4 py-3 text-sm text-slate-700">{employee.punonjesId}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{employee.emri} {employee.mbiemri}</td>
              <td className="px-4 py-3"><EmployeeRoleBadge role={employee.roli} /></td>
              <td className="px-4 py-3 text-sm text-slate-700">{employee.email || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{employee.telefoni || '—'}</td>
              <td className="px-4 py-3 text-sm text-slate-700">{employee.aktiv ? STATUS_LABELS.active : STATUS_LABELS.inactive}</td>
              <td className="px-4 py-3 text-sm">
                <div className="flex flex-wrap gap-2">
                  <Link to={`/employees/${employee.punonjesId}`} className="text-primary hover:underline">{ACTIONS.view}</Link>
                  <button type="button" onClick={() => onDelete && onDelete(employee)} className="text-red-600 hover:underline">{ACTIONS.delete}</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
