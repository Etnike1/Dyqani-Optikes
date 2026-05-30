import React, { useEffect, useMemo, useState } from 'react'
import LensFilters from '../components/Lenses/LensFilters'
import LensTable from '../components/Lenses/LensTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchLenses, deleteLens } from '../api/lenses'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function LensesPage() {
  const { notify } = useToast()
  const [lenses, setLenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchLenses()
        setLenses(data || [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const normalized = search.trim().toLowerCase()
  const filtered = useMemo(() => lenses.filter(l => {
    const txt = [l.llojiLentes, l.prodhuesi, l.indeksi].filter(Boolean).join(' ').toLowerCase()
    const matchesSearch = !normalized || txt.includes(normalized)
    const matchesType = !type || (l.llojiLentes || '').toLowerCase().includes(type.toLowerCase())
    return matchesSearch && matchesType
  }), [lenses, normalized, type])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (l) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteLens(l.lenteId)
      setLenses((c) => c.filter(item => item.lenteId !== l.lenteId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.lentet}
        title={PAGE_TITLES.lenses.title}
        description={PAGE_TITLES.lenses.description}
        actionTo="/lenses/new"
        actionLabel={ACTIONS.new}
      />

      <LensFilters
        search={search}
        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
        type={type}
        onTypeChange={(value) => { setType(value); setCurrentPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <LensTable lenses={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} lente</span>
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
