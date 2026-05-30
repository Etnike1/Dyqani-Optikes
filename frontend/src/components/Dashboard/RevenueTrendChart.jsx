import React from 'react'

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { DASHBOARD, TABLE } from '../../constants/labels.sq'
import { formatCurrency } from '../../utils/formatCurrency'



export default function RevenueTrendChart({ data = [] }) {

  return (

    <div className="panel">

      <div className="mb-4">

        <h2 className="text-base font-semibold text-[var(--text)]">{DASHBOARD.revenueTitle}</h2>

        <p className="text-sm text-[var(--muted)]">{DASHBOARD.revenueSubtitle}</p>

      </div>

      <div className="h-[320px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 10 }}>

            <defs>

              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">

                <stop offset="5%" stopColor="#0f766e" stopOpacity={0.24} />

                <stop offset="95%" stopColor="#0f766e" stopOpacity={0} />

              </linearGradient>

            </defs>

            <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" />

            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />

            <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} width={60} />

            <Tooltip

              contentStyle={{ borderRadius: 16, borderColor: '#e2e8f0' }}

              formatter={(value) => [formatCurrency(value), TABLE.total]}

            />

            <Area type="monotone" dataKey="revenue" stroke="#0f766e" strokeWidth={3} fill="url(#revenueGradient)" />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

