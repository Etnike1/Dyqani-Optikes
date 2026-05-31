import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchOrders } from '../api/orders'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { formatCurrency } from '../utils/formatCurrency'
import { MESSAGES } from '../constants/labels.sq'

export default function MyOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchOrders()
        setOrders(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Porositë e mia</h1>
        <p className="page-subtitle">Ndiqni statusin e porosive tuaja</p>
      </div>
      {orders.length === 0 ? (
        <p className="text-[var(--muted)]">{MESSAGES.noRecords}</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <Link
              key={order.porosiId}
              to={`/my-orders/${order.porosiId}`}
              className="panel block p-4 transition hover:border-primary-500/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-white">Porosia #{order.porosiId}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{order.statusi}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">Totali: {formatCurrency(order.totali ?? 0)}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
