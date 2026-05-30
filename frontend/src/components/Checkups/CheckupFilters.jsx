import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function CheckupFilters({ search, onSearchChange, employeeId, onEmployeeChange, pageSize, onPageSizeChange, employees = [] }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid md:grid-cols-3">
        <div className="filter-field md:col-span-2">
          <label htmlFor="checkup-search" className="filter-label">
            {FILTERS.searchCheckups}
          </label>
          <input
            id="checkup-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchCheckups}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="checkup-employee" className="filter-label">
            {FILTERS.employee}
          </label>
          <select
            id="checkup-employee"
            value={employeeId}
            onChange={(e) => onEmployeeChange(e.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allEmployees}</option>
            {employees.map((employee) => (
              <option key={employee.punonjesId} value={employee.punonjesId}>
                {employee.emri} {employee.mbiemri}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="checkup-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="checkup-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="filter-input"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
          </select>
        </div>
      </div>
    </div>
  )
}
