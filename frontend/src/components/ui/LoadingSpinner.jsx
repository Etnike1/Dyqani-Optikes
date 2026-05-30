import React from 'react'
import { MESSAGES } from '../../constants/labels.sq'

export default function LoadingSpinner({ label = MESSAGES.loading }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center justify-center gap-3 rounded-[28px] border border-slate-200 bg-white p-6 text-slate-500 shadow-card-md">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-300 border-t-slate-600" aria-hidden="true" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
