import React from 'react'
import { FILTERS, ORDER_STATUS } from '../../constants/labels.sq'

const STATUS_OPTIONS = [
  { value: '', label: FILTERS.allStatuses },
  { value: 'Ne proces', label: ORDER_STATUS.neProces },
  { value: 'E perfunduar', label: ORDER_STATUS.perfunduar },
  { value: 'Anuluar', label: ORDER_STATUS.anuluar },
]

export default function OrderFilters({ search, onSearchChange, status, onStatusChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="order-search" className="filter-label">
            {FILTERS.searchOrders}
          </label>
          <input
            id="order-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchOrdersPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="order-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="order-status"
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

        <div className="filter-field">
          <label htmlFor="order-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="order-page-size"
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
