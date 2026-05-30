import React, { useEffect, useMemo, useState } from 'react'
import OrderFilters from '../components/Orders/OrderFilters'
import OrderTable from '../components/Orders/OrderTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchOrders, deleteOrder } from '../api/orders'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function OrdersPage() {
  const { notify } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true)
        const data = await fetchOrders()
        setOrders(data || [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadOrders()
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const customerName = `${order.klient?.emri ?? ''} ${order.klient?.mbiemri ?? ''}`.trim().toLowerCase()
      const searchText = [String(order.porosiId), customerName, order.klient?.email, order.statusi]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const matchesSearch = !normalizedSearch || searchText.includes(normalizedSearch)
      const matchesStatus = !status || order.statusi === status
      return matchesSearch && matchesStatus
    })
  }, [orders, normalizedSearch, status])

  const pageCount = Math.max(1, Math.ceil(filteredOrders.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleOrders = useMemo(
    () => filteredOrders.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredOrders, pageIndex, pageSize]
  )

  const handleDelete = async (order) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteOrder(order.porosiId)
      setOrders((current) => current.filter((item) => item.porosiId !== order.porosiId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.porosite}
        title={PAGE_TITLES.orders.title}
        description={PAGE_TITLES.orders.description}
        actionTo="/orders/new"
        actionLabel="Porosi e re"
      />

      <OrderFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setCurrentPage(1)
        }}
        pageSize={pageSize}
        onPageSizeChange={(value) => {
          setPageSize(value)
          setCurrentPage(1)
        }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <OrderTable orders={visibleOrders} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filteredOrders.length} porosi</span>
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
