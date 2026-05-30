import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function SupplierFilters({ search, onSearchChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <div className="filter-field flex-[2]">
          <label htmlFor="supplier-search" className="filter-label">
            {FILTERS.searchSuppliers}
          </label>
          <input
            id="supplier-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchSuppliers}
            className="filter-input"
          />
        </div>

        <div className="filter-field w-full md:max-w-[180px]">
          <label htmlFor="supplier-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="supplier-page-size"
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
