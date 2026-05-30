import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SupplierForm from '../components/Suppliers/SupplierForm'
import { useToast } from '../components/ui/ToastProvider'
import { createSupplier } from '../api/suppliers'
import { MESSAGES, NAV } from '../constants/labels.sq'

export default function NewSupplier() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        emriKompanise: values.emriKompanise,
        personiKontaktit: values.personiKontaktit || null,
        telefoni: values.telefoni || null,
        email: values.email || null,
        produktetFurnizuara: values.produktetFurnizuara || ''
      }
      const created = await createSupplier(payload)
      notify(MESSAGES.saveSuccess)
      navigate(`/suppliers/${created.furnitorId}`)
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
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.furnitoret}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Furnitor i ri</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Shtoni kontaktin dhe produktet e furnizuara.</p>
          </div>
        </div>

        <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <SupplierForm onSubmit={handleSubmit} onCancel={() => navigate('/suppliers')} submitting={submitting} />
        </div>
      </div>
  )
}
