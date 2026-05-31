import React, { useEffect, useState } from 'react'
import { fetchReservations } from '../api/reservations'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { MESSAGES } from '../constants/labels.sq'

export default function MyReservationsPage() {
  const [reservations, setReservations] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchReservations()
        setReservations(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Rezervimet e mia</h1>
        <p className="page-subtitle">Takimet tuaja për kontroll sysh</p>
      </div>
      {reservations.length === 0 ? (
        <p className="text-[var(--muted)]">{MESSAGES.noRecords}</p>
      ) : (
        <div className="space-y-3">
          {reservations.map((item) => (
            <article key={item.rezervimId} className="panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-white">Rezervimi #{item.rezervimId}</span>
                <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">{item.statusi}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.dataRezervimit} · {item.oraRezervimit}
              </p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
