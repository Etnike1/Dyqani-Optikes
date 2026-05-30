import React, { useEffect, useMemo, useState } from 'react'
import SupplierFilters from '../components/Suppliers/SupplierFilters'
import SupplierTable from '../components/Suppliers/SupplierTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchSuppliers, deleteSupplier } from '../api/suppliers'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function SuppliersPage() {
  const { notify } = useToast()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchSuppliers()
        setList(data || [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const normalized = search.trim().toLowerCase()
  const filtered = useMemo(() => list.filter(s => {
    const txt = [s.emriKompanise, s.personiKontaktit, s.email, s.produktetFurnizuara].filter(Boolean).join(' ').toLowerCase()
    return !normalized || txt.includes(normalized)
  }), [list, normalized])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (s) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteSupplier(s.furnitorId)
      setList(c => c.filter(x => x.furnitorId !== s.furnitorId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.furnitoret}
        title={PAGE_TITLES.suppliers.title}
        description={PAGE_TITLES.suppliers.description}
        actionTo="/suppliers/new"
        actionLabel={ACTIONS.new}
      />

      <SupplierFilters
        search={search}
        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <SupplierTable suppliers={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} furnitorë</span>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost" disabled={pageIndex === 1} onClick={() => setCurrentPage(p => Math.max(1, p - 1))}>
                {ACTIONS.previous}
              </button>
              <span>{pageLabel(pageIndex, pageCount)}</span>
              <button type="button" className="btn-ghost" disabled={pageIndex === pageCount} onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}>
                {ACTIONS.next}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
