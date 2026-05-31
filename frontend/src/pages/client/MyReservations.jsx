import React, { useEffect, useState } from 'react'
import { fetchReservations } from '../../api/reservations'
import DataTable from '../../components/ui/DataTable'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import PageHeader from '../../components/ui/PageHeader'
import { MESSAGES, NAV, TABLE } from '../../constants/labels.sq'

const formatDate = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('sq-AL')
}

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchReservations()
        setReservations(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  const columns = [
    {
      key: 'reservation',
      title: TABLE.reservation,
      render: (reservation) => <span className="font-semibold">#{reservation.rezervimId}</span>,
    },
    {
      key: 'schedule',
      title: TABLE.schedule,
      render: (reservation) => (
        <span>
          {formatDate(reservation.dataRezervimit)} {reservation.oraRezervimit || ''}
        </span>
      ),
    },
    {
      key: 'status',
      title: TABLE.status,
      render: (reservation) => reservation.statusi || 'Ne pritje',
    },
  ]

  return (
    <div>
      <PageHeader title={NAV.myReservations} description="Rezervimet dhe takimet tuaja." />
      <DataTable columns={columns} data={reservations} />
    </div>
  )
}
