import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

const STATUS_OPTIONS = [
  { value: '', label: FILTERS.allStatuses },
  { value: 'Ne pritje', label: 'Ne pritje' },
  { value: 'Konfirmuar', label: 'Konfirmuar' },
  { value: 'Ne transport', label: 'Ne transport' },
  { value: 'E dorëzuar', label: 'E dorëzuar' },
  { value: 'Anuluar', label: 'Anuluar' },
]

export default function DeliveryFilters({ search, onSearchChange, orderId, onOrderChange, status, onStatusChange, date, onDateChange, pageSize, onPageSizeChange, orders = [] }) {
  return (
    <div className="filter-panel space-y-4 md:space-y-6">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="delivery-search" className="filter-label">
            {FILTERS.searchDeliveries}
          </label>
          <input
            id="delivery-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchDeliveriesPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="delivery-order" className="filter-label">
            {FILTERS.order}
          </label>
          <select
            id="delivery-order"
            value={orderId}
            onChange={(event) => onOrderChange(event.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allOrders}</option>
            {orders.map((order) => (
              <option key={order.porosiId} value={order.porosiId}>
                #{order.porosiId} — {order.klient?.emri} {order.klient?.mbiemri}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="delivery-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="delivery-status"
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
          <label htmlFor="delivery-date" className="filter-label">
            {FILTERS.shipDate}
          </label>
          <input
            id="delivery-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="delivery-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="delivery-page-size"
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
