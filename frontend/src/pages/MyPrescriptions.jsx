import React, { useEffect, useState } from 'react'
import { fetchPrescriptions } from '../api/prescriptions'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { MESSAGES } from '../constants/labels.sq'

export default function MyPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchPrescriptions()
        setPrescriptions(data ?? [])
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
        <h1 className="page-title">Recetat e mia</h1>
        <p className="page-subtitle">Recetat e syzeve tuaja</p>
      </div>
      {prescriptions.length === 0 ? (
        <p className="text-[var(--muted)]">{MESSAGES.noRecords}</p>
      ) : (
        <div className="space-y-3">
          {prescriptions.map((item) => (
            <article key={item.recetaId} className="panel p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-medium text-white">Receta #{item.recetaId}</span>
                <span className="text-sm text-[var(--muted)]">{item.dataRecetes}</span>
              </div>
              <p className="mt-2 text-sm text-[var(--muted)]">Mjeku: {item.mjekuEmri || MESSAGES.unknown}</p>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
