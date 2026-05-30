import React, { useEffect, useMemo, useState } from 'react'
import ReservationFilters from '../components/Reservations/ReservationFilters'
import ReservationTable from '../components/Reservations/ReservationTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchReservations, deleteReservation } from '../api/reservations'
import { fetchEmployees } from '../api/employees'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

const formatDate = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('sq-AL', { day: 'numeric', month: 'short' })
}

const formatTime = (value) => value || '—'

export default function ReservationsPage() {
  const { notify } = useToast()
  const [reservations, setReservations] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [employeeId, setEmployeeId] = useState('')
  const [status, setStatus] = useState('')
  const [date, setDate] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [reservationData, employeeData] = await Promise.all([fetchReservations(), fetchEmployees()])
        setReservations(reservationData || [])
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
    return reservations.filter((item) => {
      const customerName = `${item.klienti?.emri ?? ''} ${item.klienti?.mbiemri ?? ''}`.trim().toLowerCase()
      const employeeName = `${item.punonjesi?.emri ?? ''} ${item.punonjesi?.mbiemri ?? ''}`.trim().toLowerCase()
      const searchText = [String(item.rezervimId), customerName, employeeName, item.statusi, item.shenime]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !normalizedSearch || searchText.includes(normalizedSearch)
      const matchesEmployee = !employeeId || String(item.punonjesi?.punonjesId) === String(employeeId)
      const matchesStatus = !status || item.statusi === status
      const matchesDate = !date || item.dataRezervimit === date
      return matchesSearch && matchesEmployee && matchesStatus && matchesDate
    })
  }, [reservations, normalizedSearch, employeeId, status, date])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleReservations = useMemo(
    () => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filtered, pageIndex, pageSize]
  )

  const upcoming = useMemo(() => {
    return reservations
      .filter((item) => item.statusi !== 'Anuluar')
      .sort((a, b) => {
        const dateA = new Date(`${a.dataRezervimit}T${a.oraRezervimit}`)
        const dateB = new Date(`${b.dataRezervimit}T${b.oraRezervimit}`)
        return dateA - dateB
      })
      .slice(0, 6)
  }, [reservations])

  const scheduleGroups = useMemo(() => {
    return upcoming.reduce((groups, item) => {
      const key = item.dataRezervimit || 'Unknown'
      if (!groups[key]) groups[key] = []
      groups[key].push(item)
      return groups
    }, {})
  }, [upcoming])

  const handleDelete = async (reservation) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return

    try {
      await deleteReservation(reservation.rezervimId)
      setReservations((current) => current.filter((item) => item.rezervimId !== reservation.rezervimId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.rezervimet}
        title={PAGE_TITLES.reservations.title}
        description={PAGE_TITLES.reservations.description}
        actionTo="/reservations/new"
        actionLabel={ACTIONS.new}
      />

      <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
        <div className="space-y-6">
          <ReservationFilters
            search={search}
            onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
            employeeId={employeeId}
            onEmployeeChange={(value) => { setEmployeeId(value); setCurrentPage(1) }}
            status={status}
            onStatusChange={(value) => { setStatus(value); setCurrentPage(1) }}
            date={date}
            onDateChange={(value) => { setDate(value); setCurrentPage(1) }}
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
              <ReservationTable reservations={visibleReservations} onDelete={handleDelete} />
              <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
                <span className="text-[var(--muted)]">{filtered.length} rezervime</span>
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

        <div className="space-y-6">
          <div className="panel">
            <h2 className="text-lg font-semibold">Orari i ardhshëm</h2>
            <p className="mt-3 text-sm text-[var(--muted)]">Pamje e shpejtë e rezervimeve të ardhshme.</p>
            {upcoming.length === 0 ? (
              <p className="mt-6 text-sm text-[var(--muted)]">Nuk ka rezervime të ardhshme.</p>
            ) : (
              <div className="mt-6 space-y-4">
                {Object.entries(scheduleGroups).map(([groupDate, items]) => (
                  <div key={groupDate} className="panel-muted p-4">
                    <div className="flex items-center justify-between gap-3 text-sm font-semibold">
                      <span>{formatDate(groupDate)}</span>
                      <span>{items.length} {items.length === 1 ? 'orar' : 'orare'}</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      {items.map((item) => (
                        <div key={item.rezervimId} className="rounded-xl bg-[var(--surface)] p-3 text-sm">
                          <div className="flex items-center justify-between gap-3">
                            <span>{formatTime(item.oraRezervimit)}</span>
                            <span className="text-[var(--muted)]">{item.klienti?.emri} {item.klienti?.mbiemri}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
