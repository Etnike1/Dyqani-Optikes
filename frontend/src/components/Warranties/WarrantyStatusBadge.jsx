import React from 'react'

const STATUS_STYLES = {
  active: 'bg-emerald-100 text-emerald-800',
  expiring: 'bg-amber-100 text-amber-800',
  expired: 'bg-red-100 text-red-700',
}

function getStatus(dataSkadimit) {
  const today = new Date()
  const expiration = new Date(dataSkadimit)
  if (expiration < today) return 'expired'
  const diffDays = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24))
  return diffDays <= 30 ? 'expiring' : 'active'
}

export default function WarrantyStatusBadge({ dataSkadimit }) {
  const status = getStatus(dataSkadimit)
  const label = status === 'active' ? 'Active' : status === 'expiring' ? 'Expiring soon' : 'Expired'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${STATUS_STYLES[status]}`}>{label}</span>
}
