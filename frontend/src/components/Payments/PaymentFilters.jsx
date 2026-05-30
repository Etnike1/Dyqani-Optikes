import React from 'react'
import { FILTERS, PAYMENT_STATUS } from '../../constants/labels.sq'

export default function PaymentFilters({ search, onSearchChange, status, onStatusChange, pageSize, onPageSizeChange }) {
  return (
    <div className="filter-panel">
      <div className="filter-grid">
        <div className="filter-field md:col-span-2">
          <label htmlFor="payment-search" className="filter-label">
            {FILTERS.searchPayments}
          </label>
          <input
            id="payment-search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={FILTERS.searchPayments}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="payment-status" className="filter-label">
            {FILTERS.status}
          </label>
          <select
            id="payment-status"
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allStatuses}</option>
            <option value="E përfunduar">{PAYMENT_STATUS.completed}</option>
            <option value="Ne proces">{PAYMENT_STATUS.inProcess}</option>
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="payment-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="payment-page-size"
            value={pageSize}
            onChange={(e) => onPageSizeChange(Number(e.target.value))}
            className="filter-input"
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>
    </div>
  )
}
