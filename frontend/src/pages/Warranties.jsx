import React, { useEffect, useMemo, useState } from 'react'

import WarrantyFilters from '../components/Warranties/WarrantyFilters'

import WarrantyTable from '../components/Warranties/WarrantyTable'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import PageHeader from '../components/ui/PageHeader'

import { useToast } from '../components/ui/ToastProvider'

import { fetchWarranties, deleteWarranty } from '../api/warranties'

import { fetchCustomers } from '../api/customers'

import { fetchOrders } from '../api/orders'

import { fetchProducts } from '../api/products'

import { fetchLenses } from '../api/lenses'

import { getKlientId } from '../utils/entityRefs'

import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'



const PAGE_SIZES = [8, 12, 16]



function getWarrantyStatus(dataSkadimit) {

  if (!dataSkadimit) return 'expired'

  const today = new Date()

  const expiration = new Date(dataSkadimit)

  if (expiration < today) return 'expired'

  const diffDays = Math.ceil((expiration - today) / (1000 * 60 * 60 * 24))

  return diffDays <= 30 ? 'expiring' : 'active'

}



export default function WarrantiesPage() {

  const { notify } = useToast()

  const [warranties, setWarranties] = useState([])

  const [customers, setCustomers] = useState([])

  const [orders, setOrders] = useState([])

  const [products, setProducts] = useState([])

  const [lenses, setLenses] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')

  const [customerId, setCustomerId] = useState('')

  const [status, setStatus] = useState('')

  const [date, setDate] = useState('')

  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])

  const [currentPage, setCurrentPage] = useState(1)



  useEffect(() => {

    async function load() {

      try {

        setLoading(true)

        const [warrantyData, customerData, orderData, productData, lensData] = await Promise.all([

          fetchWarranties(),

          fetchCustomers(),

          fetchOrders(),

          fetchProducts(),

          fetchLenses(),

        ])

        setWarranties(warrantyData || [])

        setCustomers(customerData || [])

        setOrders(orderData || [])

        setProducts(productData || [])

        setLenses(lensData || [])

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

    return warranties.filter((item) => {

      const customerName = item.klienti ? `${item.klienti.emri} ${item.klienti.mbiemri}` : ''

      const orderLabel = item.porosia ? `#${item.porosia.porosiId}` : ''

      const itemLabel = item.produkti?.emri || item.lentet?.emri || ''

      const text = [customerName, orderLabel, itemLabel, item.kushtet].filter(Boolean).join(' ').toLowerCase()

      const matchesSearch = !normalizedSearch || text.includes(normalizedSearch)

      const matchesCustomer = !customerId || String(getKlientId(item.klienti)) === String(customerId)

      const matchesStatus = !status || getWarrantyStatus(item.dataSkadimit) === status

      const matchesDate = !date || item.dataSkadimit === date

      return matchesSearch && matchesCustomer && matchesStatus && matchesDate

    })

  }, [warranties, normalizedSearch, customerId, status, date])



  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))

  const pageIndex = Math.min(currentPage, pageCount)

  const visibleWarranties = useMemo(

    () => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),

    [filtered, pageIndex, pageSize]

  )



  const handleDelete = async (warranty) => {

    if (!window.confirm(ACTIONS.confirmDelete)) return



    try {

      await deleteWarranty(warranty.garanciaId)

      setWarranties((current) => current.filter((item) => item.garanciaId !== warranty.garanciaId))

      notify(MESSAGES.deleteSuccess, 'success')

    } catch {

      notify(MESSAGES.deleteError, 'error')

    }

  }



  return (

    <div className="space-y-6">

      <PageHeader

        eyebrow={NAV.garancite}

        title={PAGE_TITLES.warranties.title}

        description={PAGE_TITLES.warranties.description}

        actionTo="/warranties/new"

        actionLabel={ACTIONS.new}

      />



      <WarrantyFilters

        search={search}

        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}

        customerId={customerId}

        onCustomerChange={(value) => { setCustomerId(value); setCurrentPage(1) }}

        status={status}

        onStatusChange={(value) => { setStatus(value); setCurrentPage(1) }}

        date={date}

        onDateChange={(value) => { setDate(value); setCurrentPage(1) }}

        pageSize={pageSize}

        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}

        customers={customers}

        products={products}

        lenses={lenses}

      />



      {loading ? (

        <LoadingSpinner label={MESSAGES.loading} />

      ) : error ? (

        <div className="panel text-sm text-red-400">{error}</div>

      ) : (

        <>

          <WarrantyTable warranties={visibleWarranties} onDelete={handleDelete} />

          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">

            <span className="text-[var(--muted)]">{filtered.length} garanci</span>

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


