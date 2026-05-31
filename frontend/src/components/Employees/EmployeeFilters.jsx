import React from 'react'
import { FILTERS, ROLES, STATUS_LABELS } from '../../constants/labels.sq'

const ROLES_OPTIONS = [
  { value: '', label: FILTERS.allRoles },
  { value: 'ROLE_ADMIN', label: ROLES.admin },
  { value: 'ROLE_EMPLOYEE', label: ROLES.employee },
  { value: 'ROLE_CLIENT', label: ROLES.client },
]

const STATUSES = [
  { value: '', label: FILTERS.allStatuses },
  { value: 'active', label: STATUS_LABELS.active },
  { value: 'inactive', label: STATUS_LABELS.inactive },
]

export default function EmployeeFilters({ search, onSearchChange, role, onRoleChange, status, onStatusChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid md:grid-cols-4">
        <div className="filter-field md:col-span-2">
          <label htmlFor="employee-search" className="filter-label">
            {FILTERS.searchEmployees}
          </label>
          <input
            id="employee-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchEmployees}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="employee-role" className="filter-label">
            {FILTERS.role}
          </label>
          <select
            id="employee-role"
            value={role}
            onChange={(e) => onRoleChange(e.target.value)}
            className="filter-input"
          >
            {ROLES_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="employee-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="employee-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-input"
          >
            {STATUSES.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="employee-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="employee-page-size"
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
