import React from 'react'

export default function PaymentStatusBadge({ status }) {
  const s = (status || '').toLowerCase()
  let classes = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium '
  if (s.includes('perf') || s.includes('completed') || s.includes('e përfunduar')) classes += 'bg-emerald-100 text-emerald-800'
  else if (s.includes('process') || s.includes('proces') || s.includes('in')) classes += 'bg-amber-100 text-amber-800'
  else classes += 'bg-slate-100 text-slate-800'

  return <span className={classes}>{status || 'Unknown'}</span>
}
