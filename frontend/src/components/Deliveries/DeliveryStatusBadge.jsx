import React from 'react'

const STATUS_STYLES = {
  'Ne pritje': 'bg-amber-100 text-amber-800',
  Konfirmuar: 'bg-emerald-100 text-emerald-800',
  'Ne transport': 'bg-sky-100 text-sky-800',
  'E dorëzuar': 'bg-emerald-200 text-emerald-950',
  Anuluar: 'bg-red-100 text-red-700',
}

export default function DeliveryStatusBadge({ status }) {
  const className = STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-700'
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{status || 'Ne pritje'}</span>
}
