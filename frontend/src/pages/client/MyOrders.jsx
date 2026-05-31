import React, { useEffect, useState } from 'react'
import { fetchOrders } from '../../api/orders'
import DataTable from '../../components/ui/DataTable'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import PageHeader from '../../components/ui/PageHeader'
import { MESSAGES, NAV, STATUS_LABELS, TABLE } from '../../constants/labels.sq'
import { formatCurrency } from '../../utils/formatCurrency'

const formatDate = (dateString) => {
  if (!dateString) return '—'
  return new Date(dateString).toLocaleDateString('sq-AL')
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchOrders()
        setOrders(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  const columns = [
    {
      key: 'order',
      title: TABLE.order,
      render: (order) => <span className="font-semibold">#{order.porosiId}</span>,
    },
    {
      key: 'total',
      title: TABLE.total,
      render: (order) => formatCurrency(order.totali),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (order) => order.statusi || STATUS_LABELS.pending,
    },
    {
      key: 'date',
      title: TABLE.ordered,
      render: (order) => formatDate(order.dataPorosise),
    },
  ]

  return (
    <div>
      <PageHeader title={NAV.myOrders} description="Historia dhe statusi i porosive tuaja." />
      <DataTable columns={columns} data={orders} />
    </div>
  )
}
