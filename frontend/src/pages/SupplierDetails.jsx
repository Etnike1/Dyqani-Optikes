import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchSupplier, updateSupplier, deleteSupplier } from '../api/suppliers'
import SupplierForm from '../components/Suppliers/SupplierForm'
import { ACTIONS, MESSAGES, NAV } from '../constants/labels.sq'

export default function SupplierDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [supplier, setSupplier] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchSupplier(id)
        setSupplier(data)
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (values) => {
    if (!supplier) return
    setSubmitting(true)
    try {
      const payload = {
        emriKompanise: values.emriKompanise,
        personiKontaktit: values.personiKontaktit || null,
        telefoni: values.telefoni || null,
        email: values.email || null,
        produktetFurnizuara: values.produktetFurnizuara || ''
      }
      const updated = await updateSupplier(supplier.furnitorId, payload)
      setSupplier(updated)
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
      await deleteSupplier(supplier.furnitorId)
      notify(MESSAGES.deleteSuccess)
      navigate('/suppliers')
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
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.furnitoret}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">{supplier?.emriKompanise}</h1>
            </div>
            <div className="flex gap-2">
              <button onClick={handleDelete} className="rounded-3xl border border-red-200 px-4 py-2 text-sm text-red-600">{ACTIONS.delete}</button>
            </div>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <SupplierForm defaultValues={{ emriKompanise: supplier?.emriKompanise, personiKontaktit: supplier?.personiKontaktit, telefoni: supplier?.telefoni, email: supplier?.email, produktetFurnizuara: supplier?.produktetFurnizuara }} onSubmit={handleUpdate} onCancel={() => navigate('/suppliers')} submitting={submitting} />
        </div>
      </div>
  )
}
