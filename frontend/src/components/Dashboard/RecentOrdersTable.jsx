import React from 'react'

import Table from '../ui/Table'

import { DASHBOARD, TABLE } from '../../constants/labels.sq'



import { formatCurrency } from '../../utils/formatCurrency'



const formatDate = (value) => {

  if (!value) return '—'

  return new Date(value).toLocaleDateString('sq-AL')

}



export default function RecentOrdersTable({ orders = [] }) {

  const columns = [

    { key: 'order', title: TABLE.order, dataIndex: 'order' },

    { key: 'client', title: TABLE.customer, dataIndex: 'client' },

    { key: 'amount', title: TABLE.total, dataIndex: 'amount' },

    { key: 'status', title: TABLE.status, dataIndex: 'status' },

    { key: 'date', title: TABLE.date, dataIndex: 'date' },

  ]



  const rows = orders.map((order) => ({

    order: `#${order.porosiId}`,

    client: `${order.klient?.emri ?? ''} ${order.klient?.mbiemri ?? ''}`.trim() || '—',

    amount: formatCurrency(Number(order.totali ?? 0)),

    status: order.statusi ?? '—',

    date: formatDate(order.dataPorosise),

  }))



  return (

    <div className="panel">

      <div className="mb-4">

        <h2 className="text-base font-semibold text-[var(--text)]">{DASHBOARD.recentOrders}</h2>

        <p className="text-sm text-[var(--muted)]">{DASHBOARD.recentOrdersSubtitle}</p>

      </div>

      <Table columns={columns} data={rows} />

    </div>

  )

}

