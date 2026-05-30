import React from 'react'

const ROLE_COLORS = {
  ROLE_ADMIN: 'bg-indigo-100 text-indigo-700',
  ROLE_EMPLOYEE: 'bg-teal-100 text-teal-700',
  ROLE_USER: 'bg-slate-100 text-slate-700'
}

export default function EmployeeRoleBadge({ role }) {
  const classes = ROLE_COLORS[role] || 'bg-slate-100 text-slate-700'
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${classes}`}>
      {role ? role.replace('ROLE_', '') : 'Unknown'}
    </span>
  )
}
