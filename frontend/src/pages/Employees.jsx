import React, { useEffect, useMemo, useState } from 'react'
import EmployeeFilters from '../components/Employees/EmployeeFilters'
import EmployeeTable from '../components/Employees/EmployeeTable'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchEmployees, deleteEmployee } from '../api/employees'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16]

export default function EmployeesPage() {
  const { notify } = useToast()
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchEmployees()
        setEmployees(data || [])
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
    return employees.filter((employee) => {
      const text = [employee.emri, employee.mbiemri, employee.email, employee.telefoni, employee.roli].filter(Boolean).join(' ').toLowerCase()
      const matchesSearch = !normalizedSearch || text.includes(normalizedSearch)
      const matchesRole = !role || employee.roli === role
      const matchesStatus = !status || (status === 'active' ? employee.aktiv : !employee.aktiv)
      return matchesSearch && matchesRole && matchesStatus
    })
  }, [employees, normalizedSearch, role, status])

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visible = useMemo(() => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize), [filtered, pageIndex, pageSize])

  const handleDelete = async (employee) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteEmployee(employee.punonjesId)
      setEmployees((current) => current.filter((item) => item.punonjesId !== employee.punonjesId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.punonjesit}
        title={PAGE_TITLES.employees.title}
        description={PAGE_TITLES.employees.description}
        actionTo="/employees/new"
        actionLabel="Punonjës i ri"
      />

      <EmployeeFilters
        search={search}
        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
        role={role}
        onRoleChange={(value) => { setRole(value); setCurrentPage(1) }}
        status={status}
        onStatusChange={(value) => { setStatus(value); setCurrentPage(1) }}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <EmployeeTable employees={visible} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filtered.length} punonjës</span>
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
