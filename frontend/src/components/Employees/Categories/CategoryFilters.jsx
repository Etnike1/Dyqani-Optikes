import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function CategoryFilters({ search, onSearchChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-row">
        <div className="filter-field flex-[2]">
          <label htmlFor="category-search" className="filter-label">
            {FILTERS.searchCategories}
          </label>
          <input
            id="category-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchCategories}
            className="filter-input"
          />
        </div>

        <div className="filter-field w-full md:max-w-[180px]">
          <label htmlFor="category-page-size" className="filter-label">
            {FILTERS.itemsPerPage}
          </label>
          <select
            id="category-page-size"
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
