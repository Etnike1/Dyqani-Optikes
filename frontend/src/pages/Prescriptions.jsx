import React, { useEffect, useMemo, useState } from 'react'
import PrescriptionFilters from '../components/Prescriptions/PrescriptionFilters'
import PrescriptionTable from '../components/Prescriptions/PrescriptionTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchPrescriptions } from '../api/prescriptions'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function PrescriptionsPage() {
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
        const data = await fetchPrescriptions()
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
  const filtered = useMemo(() => list.filter(r => {
    const cust = r.klient ? `${r.klient.emri} ${r.klient.mbiemri}` : ''
    const txt = [String(r.receteId), cust, r.mjekuEmri].filter(Boolean).join(' ').toLowerCase()
    return !normalized || txt.includes(normalized)
  }), [list, normalized])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (r) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      const res = await fetch(`/api/recetat/${r.receteId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      setList(curr => curr.filter(x => x.receteId !== r.receteId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.recetat}
        title={PAGE_TITLES.prescriptions.title}
        description={PAGE_TITLES.prescriptions.description}
        actionTo="/prescriptions/new"
        actionLabel={ACTIONS.new}
      />

      <PrescriptionFilters search={search} onSearchChange={(v) => { setSearch(v); setCurrentPage(1) }} pageSize={pageSize} onPageSizeChange={(v) => { setPageSize(v); setCurrentPage(1) }} />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <PrescriptionTable prescriptions={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} receta</span>
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
