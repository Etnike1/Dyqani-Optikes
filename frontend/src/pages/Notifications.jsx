import React, { useEffect, useMemo, useState } from 'react'

import NotificationFilters from '../components/Notifications/NotificationFilters'

import NotificationTable from '../components/Notifications/NotificationTable'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import PageHeader from '../components/ui/PageHeader'

import { useToast } from '../components/ui/ToastProvider'

import { fetchNotifications, deleteNotification, updateNotification } from '../api/notifications'

import { fetchCustomers } from '../api/customers'

import { getKlientId } from '../utils/entityRefs'

import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'



const PAGE_SIZES = [8, 12, 16]



export default function NotificationsPage() {

  const { notify } = useToast()

  const [notifications, setNotifications] = useState([])

  const [customers, setCustomers] = useState([])

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

        const [notificationsData, customersData] = await Promise.all([fetchNotifications(), fetchCustomers()])

        setNotifications(notificationsData || [])

        setCustomers(customersData || [])

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

    return notifications.filter((item) => {

      const customerName = item.klienti ? `${item.klienti.emri} ${item.klienti.mbiemri}` : ''

      const text = [item.mesazhi, customerName].filter(Boolean).join(' ').toLowerCase()

      const matchesSearch = !normalizedSearch || text.includes(normalizedSearch)

      const matchesCustomer = !customerId || String(getKlientId(item.klienti)) === String(customerId)

      const matchesStatus =

        !status || String(item.lexuar) === status

      const matchesDate = !date || item.dataKrijimit?.startsWith(date)

      return matchesSearch && matchesCustomer && matchesStatus && matchesDate

    })

  }, [notifications, normalizedSearch, customerId, status, date])



  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))

  const pageIndex = Math.min(currentPage, pageCount)

  const visibleNotifications = useMemo(

    () => filtered.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),

    [filtered, pageIndex, pageSize]

  )



  const handleToggleRead = async (notification) => {

    try {

      const updated = await updateNotification(notification.njoftimId, {

        ...notification,

        lexuar: !notification.lexuar,

      })

      setNotifications((current) =>

        current.map((item) => (item.njoftimId === updated.njoftimId ? updated : item))

      )

      notify(MESSAGES.saveSuccess, 'success')

    } catch {

      notify(MESSAGES.saveError, 'error')

    }

  }



  const handleDelete = async (notification) => {

    if (!window.confirm(ACTIONS.confirmDelete)) return



    try {

      await deleteNotification(notification.njoftimId)

      setNotifications((current) => current.filter((item) => item.njoftimId !== notification.njoftimId))

      notify(MESSAGES.deleteSuccess, 'success')

    } catch {

      notify(MESSAGES.deleteError, 'error')

    }

  }



  const unreadCount = notifications.filter((item) => !item.lexuar).length



  return (

    <div className="space-y-6">

      <PageHeader

        eyebrow={NAV.njoftimet}

        title={PAGE_TITLES.notifications.title}

        description={PAGE_TITLES.notifications.description}

        actionTo="/notifications/new"

        actionLabel={ACTIONS.new}

      >

        <div className="panel-muted text-sm text-[var(--muted)]">

          {unreadCount} të palexuara

        </div>

      </PageHeader>



      <NotificationFilters

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

      />



      {loading ? (

        <LoadingSpinner label={MESSAGES.loading} />

      ) : error ? (

        <div className="panel text-sm text-red-400">{error}</div>

      ) : (

        <>

          <NotificationTable notifications={visibleNotifications} onToggleRead={handleToggleRead} onDelete={handleDelete} />

          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">

            <span className="text-[var(--muted)]">{filtered.length} njoftime</span>

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


