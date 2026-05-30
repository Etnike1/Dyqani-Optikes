import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import LensForm from '../components/Lenses/LensForm'
import { useToast } from '../components/ui/ToastProvider'
import { createLens } from '../api/lenses'
import { MESSAGES, NAV } from '../constants/labels.sq'

export default function NewLens() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values) => {
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
      const created = await createLens(payload)
      notify(MESSAGES.saveSuccess)
      navigate(`/lenses/${created.lenteId}`)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.lentet}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Lente e re</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Vendosni detajet, çmimin dhe stokun e lentes.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <LensForm onSubmit={handleSubmit} onCancel={() => navigate('/lenses')} submitting={submitting} />
        </div>
      </div>
  )
}
