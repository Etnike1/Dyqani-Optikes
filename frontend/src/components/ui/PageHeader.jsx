import React from 'react'
import { Link } from 'react-router-dom'
import { ACTIONS } from '../../constants/labels.sq'

export default function PageHeader({ eyebrow, title, description, actionTo, actionLabel, onAction, children }) {
  return (
    <div className="panel mb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {eyebrow && <p className="text-xs font-medium uppercase tracking-widest text-[var(--muted)]">{eyebrow}</p>}
          <h1 className="page-title mt-1">{title}</h1>
          {description && <p className="page-subtitle">{description}</p>}
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          {actionTo && (
            <Link to={actionTo} className="btn-primary">
              {actionLabel || ACTIONS.new}
            </Link>
          )}
          {onAction && (
            <button type="button" onClick={onAction} className="btn-primary">
              {actionLabel || ACTIONS.new}
            </button>
          )}
          {children}
        </div>
      </div>
    </div>
  )
}
