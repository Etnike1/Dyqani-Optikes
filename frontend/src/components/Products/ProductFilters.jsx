import React from 'react'
import { FILTERS } from '../../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function ProductFilters({
  search,
  onSearchChange = () => {},
  category = '',
  onCategoryChange = () => {},
  categories = [],
  pageSize = PAGE_SIZES[0],
  onPageSizeChange = () => {},
}) {
  return (
    <div className="filter-panel">
      <div className="filter-grid md:grid-cols-3">
        <div className="filter-field md:col-span-2">
          <label htmlFor="product-search" className="filter-label">
            {FILTERS.searchProducts}
          </label>
          <input
            id="product-search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={FILTERS.searchProductsPlaceholder}
            className="filter-input"
          />
        </div>

        <div className="filter-field">
          <label htmlFor="product-category" className="filter-label">
            {FILTERS.category}
          </label>
          <select
            id="product-category"
            value={category}
            onChange={(event) => onCategoryChange(event.target.value)}
            className="filter-input"
          >
            <option value="">{FILTERS.allCategories}</option>
            {categories.map((item) => (
              <option key={item.kategoriId} value={item.kategoriId}>
                {item.emriKategorise}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-field">
          <label htmlFor="product-page-size" className="filter-label">
            {FILTERS.pageSize}
          </label>
          <select
            id="product-page-size"
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="filter-input"
          >
            {PAGE_SIZES.map((size) => (
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
