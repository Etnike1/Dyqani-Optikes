import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchCategory } from '../api/categories'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { ACTIONS, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

const formatStatus = (active) => (active ? STATUS.active : STATUS.inactive)

export default function CategoryDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true)
        const data = await fetchCategory(id)
        setCategory(data)
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadCategory()
  }, [id])

  return (
    <div className="p-6">
        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : error ? (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-card-md">
            {error}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-3 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.kategorite}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">{category.emriKategorise}</h1>
                <p className="mt-2 text-sm text-slate-500">ID: {category.kategoriId}</p>
              </div>
              <Button type="button" onClick={() => navigate('/categories')} className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800">
                <ArrowLeft className="h-4 w-4" />
                {ACTIONS.back}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.overview}</h2>
                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.name}</p>
                    <p className="mt-1">{category.emriKategorise}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.status}</p>
                    <p className="mt-1">{formatStatus(category.aktive)}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.description}</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">{category.pershkrimi || STATUS.noDescription}</p>
              </section>
            </div>
          </div>
        )}
      </div>
  )
}
