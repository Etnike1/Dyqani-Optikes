import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchLens, updateLens, deleteLens } from '../api/lenses'
import LensForm from '../components/Lenses/LensForm'
import { ACTIONS, MESSAGES, NAV } from '../constants/labels.sq'

export default function LensDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [lens, setLens] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchLens(id)
        setLens(data)
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (values) => {
    if (!lens) return
    setSubmitting(true)
    try {
      const payload = {
        llojiLentes: values.llojiLentes,
        prodhuesi: values.prodhuesi || null,
        indeksi: values.indeksi || null,
        veshja: values.veshja || null,
        cmimi: values.cmimi ? Number(values.cmimi) : null,
        sasiaStok: values.sasiaStok ? Number(values.sasiaStok) : 0,
      }
      const updated = await updateLens(lens.lenteId, payload)
      setLens(updated)
      notify(MESSAGES.saveSuccess)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return
    try {
      await deleteLens(lens.lenteId)
      notify(MESSAGES.deleteSuccess)
      navigate('/lenses')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) return <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.lentet}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">{lens?.llojiLentes}</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDelete} className="rounded-3xl border border-red-200 px-4 py-2 text-sm text-red-600">{ACTIONS.delete}</button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <LensForm defaultValues={{ llojiLentes: lens?.llojiLentes, prodhuesi: lens?.prodhuesi, indeksi: lens?.indeksi, veshja: lens?.veshja, cmimi: lens?.cmimi, sasiaStok: lens?.sasiaStok }} onSubmit={handleUpdate} onCancel={() => navigate('/lenses')} submitting={submitting} />
        </div>
      </div>
  )
}
