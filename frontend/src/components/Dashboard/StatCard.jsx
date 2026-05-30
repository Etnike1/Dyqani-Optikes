import React from 'react'

export default function StatCard({ title, value, subtitle, label }) {
  return (
    <div className="panel">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-medium text-[var(--muted)]">{title}</h3>
          <p className="mt-2 text-2xl font-semibold text-[var(--text)] sm:text-3xl">{value}</p>
        </div>
        {label ? (
          <div className="rounded-full bg-primary-900/40 px-3 py-1 text-xs font-semibold uppercase text-primary-300">
            {label}
          </div>
        ) : null}
      </div>
      {subtitle ? <p className="mt-3 text-sm text-[var(--muted)]">{subtitle}</p> : null}
    </div>
  )
}
