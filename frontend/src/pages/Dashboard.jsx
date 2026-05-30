import React, { useEffect, useMemo, useState } from 'react'
import StatCard from '../components/Dashboard/StatCard'
import RevenueTrendChart from '../components/Dashboard/RevenueTrendChart'
import OrderStatusChart from '../components/Dashboard/OrderStatusChart'
import InventoryAlertCard from '../components/Dashboard/InventoryAlertCard'
import RecentOrdersTable from '../components/Dashboard/RecentOrdersTable'
import PageHeader from '../components/ui/PageHeader'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { fetchDashboardMetrics } from '../api/dashboard'
import { MESSAGES, NAV } from '../constants/labels.sq'
import { formatCurrency } from '../utils/formatCurrency'

const getOrderStatusKey = (status) => {
  if (!status) return 'Tjetër'
  const normalized = status.toString().toLowerCase()
  if (normalized.includes('perf')) return 'E perfunduar'
  if (normalized.includes('proces') || normalized.includes('process')) return 'Ne proces'
  if (normalized.includes('anul')) return 'Anuluar'
  return 'Tjetër'
}

export default function DashboardPage() {
  const [orders, setOrders] = useState([])
  const [payments, setPayments] = useState([])
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchDashboardMetrics()
        setOrders(data.orders)
        setPayments(data.payments)
        setProducts(data.products)
        setInventory(data.inventory)
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const totalRevenue = useMemo(
    () => payments.reduce((sum, p) => sum + (Number(p.shuma) || 0), 0),
    [payments]
  )

  const completedOrders = useMemo(
    () => orders.filter((order) => getOrderStatusKey(order.statusi) === 'E perfunduar').length,
    [orders]
  )

  const pendingPayments = useMemo(
    () =>
      payments.filter((payment) => {
        const status = payment.statusi?.toString().toLowerCase() || ''
        return status.includes('pend') || status.includes('prit') || status === ''
      }).length,
    [payments]
  )

  const lowStockCount = useMemo(
    () => inventory.filter((item) => Number(item.sasiaAktuale) <= Number(item.sasiaMinimale)).length,
    [inventory]
  )

  const averageOrderValue = useMemo(
    () => (orders.length ? orders.reduce((s, o) => s + (Number(o.totali) || 0), 0) / orders.length : 0),
    [orders]
  )

  const revenueTrendData = useMemo(() => {
    const grouped = orders.reduce((acc, order) => {
      const date = order.dataPorosise
        ? new Date(order.dataPorosise).toISOString().slice(0, 10)
        : 'E panjohur'
      acc[date] = (acc[date] || 0) + (Number(order.totali) || 0)
      return acc
    }, {})

    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, revenue]) => ({
        date: date === 'E panjohur' ? date : date.slice(5).replace('-', '/'),
        revenue,
      }))
  }, [orders])

  const orderStatusData = useMemo(() => {
    const counts = orders.reduce((acc, order) => {
      const key = getOrderStatusKey(order.statusi)
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    return [
      { name: 'E perfunduar', value: counts['E perfunduar'] || 0 },
      { name: 'Ne proces', value: counts['Ne proces'] || 0 },
      { name: 'Anuluar', value: counts['Anuluar'] || 0 },
      { name: 'Tjetër', value: counts.Tjetër || 0 },
    ]
  }, [orders])

  const inventoryAlerts = useMemo(
    () =>
      inventory
        .filter((item) => Number(item.sasiaAktuale) <= Number(item.sasiaMinimale))
        .map((item) => ({
          ...item,
          emriProduktit: item.produkt?.emriProduktit,
          sasiaStok: item.sasiaAktuale,
        })),
    [inventory]
  )

  const recentOrders = useMemo(
    () =>
      [...orders]
        .sort((a, b) => new Date(b.dataPorosise) - new Date(a.dataPorosise))
        .slice(0, 6),
    [orders]
  )

  if (loading) {
    return <LoadingSpinner label={MESSAGES.loading} />
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.dashboard}
        title="Paneli kryesor"
        description="Metrika në kohë reale nga porositë, pagesat, inventari dhe produktet."
      >
        <div className="panel-muted text-sm text-[var(--muted)]">
          {orders.length} porosi · {products.length} produkte · {inventoryAlerts.length} alarme stoku
        </div>
      </PageHeader>

      {error && <div className="rounded-2xl border border-red-800/50 bg-red-950/40 p-4 text-sm text-red-300">{error}</div>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Të ardhura (pagesa)"
          value={formatCurrency(totalRevenue)}
          subtitle={`${payments.length} pagesa · Mesatarja e porosisë ${formatCurrency(averageOrderValue)}`}
        />
        <StatCard title="Porosi të përfunduara" value={completedOrders} subtitle="statusi: E perfunduar" />
        <StatCard title="Pagesa në pritje" value={pendingPayments} subtitle="Kërkojnë veprim" />
        <StatCard
          title="Alarme inventari"
          value={lowStockCount}
          subtitle="sasiaAktuale ≤ sasiaMinimale"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
        <RevenueTrendChart data={revenueTrendData} />
        <OrderStatusChart data={orderStatusData} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_0.9fr]">
        <RecentOrdersTable orders={recentOrders} />
        <InventoryAlertCard alerts={inventoryAlerts} />
      </div>
    </div>
  )
}
