import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function CustomerFilters({ value, onChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <div className="filter-field flex-[2]">
          <label htmlFor="customer-search" className="filter-label">
            {FILTERS.searchCustomers}
          </label>
          <input
            id="customer-search"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={FILTERS.searchCustomers}
            className="filter-input"
          />
        </div>

        <div className="filter-field w-full md:max-w-[180px]">
          <label htmlFor="customer-page-size" className="filter-label">
            {FILTERS.itemsPerPage}
          </label>
          <select
            id="customer-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="filter-input"
          >
            {[8, 12, 16, 20].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
