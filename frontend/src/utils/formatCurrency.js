/**
 * Formats a numeric value as EUR (e.g. "€1,250.00").
 * @param {number|string|null|undefined} value
 * @returns {string}
 */
export function formatCurrency(value) {
  if (value == null || value === '') return '—'

  const amount = Number(value)
  if (!Number.isFinite(amount)) return '—'

  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}
