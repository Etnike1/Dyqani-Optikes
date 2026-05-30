import React from 'react'

export default function SectionHeader({ title, description, badge, className = '', children }) {
  return (
    <div className={`flex flex-col gap-3 rounded-3xl bg-slate-950/5 p-5 sm:flex-row sm:items-center sm:justify-between ${className}`}>
      <div>
        {badge && <p className="text-xs font-semibold uppercase tracking-[0.30em] text-slate-500">{badge}</p>}
        <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">{description}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  )
}
