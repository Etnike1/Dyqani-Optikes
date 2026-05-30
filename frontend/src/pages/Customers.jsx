import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import CustomerFilters from '../components/Customers/CustomerFilters'
import CustomerTable from '../components/Customers/CustomerTable'
import CustomerForm from '../components/Customers/CustomerForm'
import { fetchCustomers, createCustomer, updateCustomer, deleteCustomer } from '../api/customers'
import { useToast } from '../components/ui/ToastProvider'
import { NAV, ACTIONS, MESSAGES } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function CustomersPage() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadCustomers() {
      try {
        setLoading(true)
        const data = await fetchCustomers()
        setCustomers(data || [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadCustomers()
  }, [])

  const normalizedSearch = searchQuery.trim().toLowerCase()
  const filteredCustomers = useMemo(() => {
    if (!normalizedSearch) return customers
    return customers.filter((customer) => {
      const name = `${customer.emri ?? ''} ${customer.mbiemri ?? ''}`.toLowerCase()
      return (
        name.includes(normalizedSearch) ||
        (customer.email ?? '').toLowerCase().includes(normalizedSearch) ||
        (customer.telefoni ?? '').toLowerCase().includes(normalizedSearch) ||
        (customer.adresa ?? '').toLowerCase().includes(normalizedSearch)
      )
    })
  }, [customers, normalizedSearch])

  const pageCount = Math.max(1, Math.ceil(filteredCustomers.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleCustomers = useMemo(
    () => filteredCustomers.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredCustomers, pageIndex, pageSize]
  )

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editingCustomer) {
        const updated = await updateCustomer(editingCustomer.id, values)
        setCustomers((current) => current.map((item) => (item.id === updated.id ? updated : item)))
        notify(MESSAGES.saveSuccess, 'success')
      } else {
        const created = await createCustomer(values)
        setCustomers((current) => [created, ...current])
        notify(MESSAGES.saveSuccess, 'success')
      }
      setIsModalOpen(false)
      setEditingCustomer(null)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (customer) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteCustomer(customer.id)
      setCustomers((current) => current.filter((item) => item.id !== customer.id))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.klientet}
        title="Menaxhimi i klientëve"
        description="Krijoni, ndryshoni dhe fshini regjistrimet e klientëve."
        onAction={() => {
          setEditingCustomer(null)
          setIsModalOpen(true)
        }}
        actionLabel={ACTIONS.new}
      />

      <CustomerFilters
        value={searchQuery}
        onChange={(value) => {
          setSearchQuery(value)
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
          <CustomerTable
            customers={visibleCustomers}
            onEdit={(c) => {
              setEditingCustomer(c)
              setIsModalOpen(true)
            }}
            onDelete={handleDelete}
          />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filteredCustomers.length} klientë</span>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost" disabled={pageIndex === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}>
                {ACTIONS.previous}
              </button>
              <span>
                Faqja {pageIndex} / {pageCount}
              </span>
              <button type="button" className="btn-ghost" disabled={pageIndex === pageCount} onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}>
                {ACTIONS.next}
              </button>
            </div>
          </div>
        </>
      )}

      <Modal open={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingCustomer(null) }}>
        <h2 className="mb-4 text-xl font-semibold">{editingCustomer ? 'Ndrysho klientin' : 'Klient i ri'}</h2>
        <CustomerForm
          defaultValues={editingCustomer ?? undefined}
          onSubmit={handleSubmit}
          onCancel={() => { setIsModalOpen(false); setEditingCustomer(null) }}
          isSubmitting={submitting}
        />
      </Modal>
    </div>
  )
}
