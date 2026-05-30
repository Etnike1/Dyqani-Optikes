import React from 'react'

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

import { DASHBOARD } from '../../constants/labels.sq'



const STATUS_COLORS = {

  'E perfunduar': '#0f766e',

  'Ne proces': '#f97316',

  'Anuluar': '#ef4444',

  'Tjetër': '#3b82f6',

}



export default function OrderStatusChart({ data = [] }) {

  const chartData = data.map(item => ({

    name: item.name,

    value: item.value,

  }))



  return (

    <div className="panel">

      <div className="mb-4">

        <h2 className="text-base font-semibold text-[var(--text)]">{DASHBOARD.orderStatusTitle}</h2>

        <p className="text-sm text-[var(--muted)]">{DASHBOARD.orderStatusSubtitle}</p>

      </div>

      <div className="h-[280px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie data={chartData} dataKey="value" nameKey="name" innerRadius={60} outerRadius={96} paddingAngle={4}>

              {chartData.map(entry => (

                <Cell

                  key={entry.name}

                  fill={STATUS_COLORS[entry.name] ?? STATUS_COLORS.Tjetër}

                />

              ))}

            </Pie>

            <Tooltip formatter={(value) => [value, DASHBOARD.ordersTooltip]} />

            <Legend verticalAlign="bottom" height={36} iconType="circle" />

          </PieChart>

        </ResponsiveContainer>

      </div>

    </div>

  )

}

