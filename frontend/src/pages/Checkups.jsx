import React, { useEffect, useMemo, useState } from 'react'
import CheckupFilters from '../components/Checkups/CheckupFilters'
import CheckupTable from '../components/Checkups/CheckupTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCheckups, deleteCheckup } from '../api/checkups'
import { fetchEmployees } from '../api/employees'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function CheckupsPage() {
  const { notify } = useToast()
  const [checkups, setCheckups] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [checkupData, employeeData] = await Promise.all([fetchCheckups(), fetchEmployees()])
        setCheckups(checkupData || [])
        setEmployees(employeeData || [])
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
    return checkups.filter((item) => {
      const patient = item.klient ? `${item.klient.emri} ${item.klient.mbiemri}` : ''
      const employee = item.punonjesi ? `${item.punonjesi.emri} ${item.punonjesi.mbiemri}` : ''
      const text = [patient, employee, item.receteId, item.rezultati, item.rekomandimi].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = !normalizedSearch || text.includes(normalizedSearch)
      const matchesEmployee = !employeeId || String(item.punonjesi?.punonjesId) === String(employeeId)
      return matchesSearch && matchesEmployee
    })
  }, [checkups, normalizedSearch, employeeId])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (checkup) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteCheckup(checkup.kontrollId)
      setCheckups((current) => current.filter((item) => item.kontrollId !== checkup.kontrollId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.kontrolletSyve}
        title={PAGE_TITLES.checkups.title}
        description={PAGE_TITLES.checkups.description}
        actionTo="/checkups/new"
        actionLabel={ACTIONS.new}
      />

      <CheckupFilters
        search={search}
        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
        employeeId={employeeId}
        onEmployeeChange={(value) => { setEmployeeId(value); setCurrentPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}
        employees={employees}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <CheckupTable checkups={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} kontrolle</span>
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
