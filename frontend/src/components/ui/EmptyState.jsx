import React from 'react'

export default function EmptyState({ title = 'No data available', description = 'Try adjusting your filters or refreshing the page.', action }) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-slate-700 shadow-card-md">
      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Nothing here yet</p>
      <h3 className="mt-4 text-xl font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  )
}
