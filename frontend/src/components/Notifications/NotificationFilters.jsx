import React from 'react'

import { getKlientId, klientLabel } from '../../utils/entityRefs'

import { FILTERS } from '../../constants/labels.sq'

export default function NotificationFilters({
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
}) {
  return (
    <div className="filter-panel space-y-4 md:space-y-6">
      <div className="filter-grid">
        <div className="filter-field">
          <label htmlFor="notification-search" className="filter-label">
            {FILTERS.searchNotifications}
          </label>
          <input
            id="notification-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchNotificationsPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="notification-customer" className="filter-label">
            {FILTERS.customer}
          </label>
          <select
            id="notification-customer"
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
          <label htmlFor="notification-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="notification-status"
            value={status}
            onChange={(event) => onStatusChange(event.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allStatuses}</option>
            <option value="true">{FILTERS.unread}</option>
            <option value="false">{FILTERS.read}</option>
          </select>
        </div>
      </div>

      <div className="filter-grid md:max-w-2xl md:grid-cols-2">
        <div className="filter-field">
          <label htmlFor="notification-date" className="filter-label">
            {FILTERS.createdDate}
          </label>
          <input
            id="notification-date"
            type="date"
            value={date}
            onChange={(event) => onDateChange(event.target.value)}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="notification-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="notification-page-size"
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
