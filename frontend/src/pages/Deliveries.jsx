import React, { useEffect, useMemo, useState } from 'react'
import DeliveryFilters from '../components/Deliveries/DeliveryFilters'
import DeliveryTable from '../components/Deliveries/DeliveryTable'
import DeliverySchedulePanel from '../components/Deliveries/DeliverySchedulePanel'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchDeliveries, deleteDelivery } from '../api/deliveries'
import { fetchOrders } from '../api/orders'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function DeliveriesPage() {
  const { notify } = useToast()
  const [deliveries, setDeliveries] = useState([])
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [orderId, setOrderId] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [deliveryData, orderData] = await Promise.all([fetchDeliveries(), fetchOrders()])
        setDeliveries(deliveryData || [])
        setOrders(orderData || [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const filtered = useMemo(() => {
    return deliveries.filter((item) => {
      const orderLabel = item.porosia ? `#${item.porosia.porosiId}` : ''
      const customerName = item.porosia?.klient ? `${item.porosia.klient.emri} ${item.porosia.klient.mbiemri}` : ''
      const text = [orderLabel, customerName, item.kompaniaTransportit, item.numriGjurmimit, item.adresaDergeses, item.statusiDergeses]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !normalizedSearch || text.includes(normalizedSearch)
      const matchesOrder = !orderId || String(item.porosia?.porosiId) === String(orderId)
      const matchesStatus = !status || item.statusiDergeses === status
      const matchesDate = !date || item.dataNisjes === date
      return matchesSearch && matchesOrder && matchesStatus && matchesDate
    })
  }, [deliveries, normalizedSearch, orderId, status, date])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleDeliveries = useMemo(
    () => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filtered, pageIndex, pageSize]
  )

  const handleDelete = async (delivery) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return

    try {
      await deleteDelivery(delivery.dergesaId)
      setDeliveries((current) => current.filter((item) => item.dergesaId !== delivery.dergesaId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.dergesat}
        title={PAGE_TITLES.deliveries.title}
        description={PAGE_TITLES.deliveries.description}
        actionTo="/deliveries/new"
        actionLabel={ACTIONS.new}
      />

      <DeliveryFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        orderId={orderId}
        onOrderChange={(value) => {
          setOrderId(value)
          setCurrentPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setCurrentPage(1)
        }}
        date={date}
        onDateChange={(value) => {
          setDate(value)
          setCurrentPage(1)
        }}
        pageSize={pageSize}
        onPageSizeChange={(value) => {
          setPageSize(value)
          setCurrentPage(1)
        }}
        orders={orders}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <DeliverySchedulePanel deliveries={deliveries.slice(0, 3)} />
          <DeliveryTable deliveries={visibleDeliveries} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} dërgesa</span>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost" disabled={pageIndex === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                {ACTIONS.previous}
              </button>
              <span>{pageLabel(pageIndex, pageCount)}</span>
              <button type="button" className="btn-ghost" disabled={pageIndex === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}>
                {ACTIONS.next}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
