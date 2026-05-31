import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function LensFilters({ search, onSearchChange, type, onTypeChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid md:grid-cols-4">
        <div className="filter-field md:col-span-2">
          <label htmlFor="lens-search" className="filter-label">
            {FILTERS.searchLensesPlaceholder}
          </label>
          <input
            id="lens-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchLensesPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="lens-type" className="filter-label">
            {FILTERS.searchLensesType}
          </label>
          <input
            id="lens-type"
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            placeholder={FILTERS.searchLensesType}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="lens-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="lens-page-size"
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
