import React from 'react'

import { getKlientId, klientLabel } from '../../utils/entityRefs'

import { FILTERS, MESSAGES } from '../../constants/labels.sq'

const STATUS_OPTIONS = [
  { value: '', label: FILTERS.allStatuses },
  { value: 'active', label: FILTERS.warrantyActive },
  { value: 'expiring', label: FILTERS.warrantyExpiring },
  { value: 'expired', label: FILTERS.warrantyExpired },
]

export default function WarrantyFilters({
  search,
  onSearchChange,
  customerId,
  onCustomerChange,
  status,
  onStatusChange,
  date,
  onDateChange,
  pageSize,
  onPageSizeChange,
  customers = [],
  products = [],
  lenses = [],
}) {
  return (
    <div className="filter-panel space-y-4 md:space-y-6">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="warranty-search" className="filter-label">
            {FILTERS.searchWarranties}
          </label>
          <input
            id="warranty-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchWarrantiesPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="warranty-customer" className="filter-label">
            {FILTERS.customer}
          </label>
          <select
            id="warranty-customer"
            value={customerId}
            onChange={(event) => onCustomerChange(event.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allCustomers}</option>
            {customers.map((customer) => (
              <option key={getKlientId(customer)} value={getKlientId(customer)}>
                {klientLabel(customer)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="warranty-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="warranty-status"
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

      <div className="filter-grid md:grid-cols-3">
        <div className="filter-field">
          <label htmlFor="warranty-date" className="filter-label">
            {FILTERS.expiration}
          </label>
          <input
            id="warranty-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="warranty-product-lens" className="filter-label">
            {FILTERS.productLens}
          </label>
          <select id="warranty-product-lens" value="" disabled className="filter-input">
            <option>{MESSAGES.filterProductLensInSearch}</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="warranty-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="warranty-page-size"
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
