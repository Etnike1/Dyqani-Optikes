import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

const STATUS_OPTIONS = [
  { value: '', label: FILTERS.allStatuses },
  { value: 'Ne pritje', label: 'Ne pritje' },
  { value: 'Konfirmuar', label: 'Konfirmuar' },
  { value: 'E perfunduar', label: 'E perfunduar' },
  { value: 'Anuluar', label: 'Anuluar' },
]

export default function ReservationFilters({
  search,
  onSearchChange,
  employeeId,
  onEmployeeChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  pageSize,
  onPageSizeChange,
  employees = [],
}) {
  return (
    <div className="filter-panel space-y-4 md:space-y-6">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="reservation-search" className="filter-label">
            {FILTERS.searchReservations}
          </label>
          <input
            id="reservation-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchReservationsPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="reservation-employee" className="filter-label">
            {FILTERS.employee}
          </label>
          <select
            id="reservation-employee"
            value={employeeId}
            onChange={(event) => onEmployeeChange(event.target.value)}
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
          <label htmlFor="reservation-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="reservation-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="filter-input"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="filter-grid md:max-w-2xl md:grid-cols-2">
        <div className="filter-field">
          <label htmlFor="reservation-date" className="filter-label">
            {FILTERS.reservationDate}
          </label>
          <input
            id="reservation-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="reservation-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="reservation-page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="filter-input"
          >
            <option value={8}>{FILTERS.perPage(8)}</option>
            <option value={12}>{FILTERS.perPage(12)}</option>
            <option value={16}>{FILTERS.perPage(16)}</option>
          </select>
        </div>
      </div>
    </div>
  )
}
