import React from 'react'

export default function Card({ title, subtitle, actions, className = '', children, ...props }) {
  return (
    <section className={`card overflow-hidden ${className}`} {...props}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col gap-3 border-b border-neutral-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div>
            {title && <h2 className="text-xl font-semibold text-slate-900">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-600">{subtitle}</p>}
          </div>
          {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  )
}
