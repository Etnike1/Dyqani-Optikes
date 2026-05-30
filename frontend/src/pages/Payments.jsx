import React, { useEffect, useMemo, useState } from 'react'
import PaymentFilters from '../components/Payments/PaymentFilters'
import PaymentTable from '../components/Payments/PaymentTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchPayments, deletePayment } from '../api/payments'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function PaymentsPage() {
  const { notify } = useToast()
  const [payments, setPayments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchPayments()
        setPayments(data || [])
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
    return payments.filter((p) => {
      const customer = p.porosia?.klient ? `${p.porosia.klient.emri} ${p.porosia.klient.mbiemri}` : ''
      const txt = [String(p.id), String(p.porosia?.porosiId), customer, p.metodaPageses, p.statusi].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = !normalizedSearch || txt.includes(normalizedSearch)
      const matchesStatus = !status || p.statusi === status
      return matchesSearch && matchesStatus
    })
  }, [payments, normalizedSearch, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (payment) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deletePayment(payment.id)
      setPayments((c) => c.filter((p) => p.id !== payment.id))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.pagesat}
        title={PAGE_TITLES.payments.title}
        description={PAGE_TITLES.payments.description}
        actionTo="/payments/new"
        actionLabel="Pagesë e re"
      />

      <PaymentFilters
        search={search}
        onSearchChange={(v) => { setSearch(v); setCurrentPage(1) }}
        status={status}
        onStatusChange={(v) => { setStatus(v); setCurrentPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(v) => { setPageSize(v); setCurrentPage(1) }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <PaymentTable payments={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} pagesa</span>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost" disabled={pageIndex === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                {ACTIONS.previous}
              </button>
              <span>{pageLabel(pageIndex, pageCount)}</span>
              <button type="button" className="btn-ghost" disabled={pageIndex === pageCount} onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}>
                {ACTIONS.next}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
