import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

export default function InventoryFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  pageSize,
  onPageSizeChange,
}) {
  return (
    <div className="filter-panel">
      <div className="filter-grid md:grid-cols-3">
        <div className="filter-field md:col-span-2">
          <label htmlFor="inventory-search" className="filter-label">
            {FILTERS.searchInventory}
          </label>
          <input
            id="inventory-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchInventoryPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="inventory-status" className="filter-label">
            {FILTERS.stockStatus}
          </label>
          <select
            id="inventory-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allStatuses}</option>
            <option value="low">{FILTERS.lowStock}</option>
            <option value="ok">{FILTERS.healthyStock}</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="inventory-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="inventory-page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="filter-input"
          >
            {[8, 12, 16, 20].map((size) => (
              <option key={size} value={size}>
                {FILTERS.perPage(size)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
