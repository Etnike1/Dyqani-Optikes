import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchPayment, updatePayment, deletePayment, fetchPaymentsByOrder } from '../api/payments'
import PaymentForm from '../components/Payments/PaymentForm'
import PaymentTable from '../components/Payments/PaymentTable'
import { ACTIONS, FIELD, MESSAGES, NAV } from '../constants/labels.sq'

export default function PaymentDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [payment, setPayment] = useState(null)
  const [related, setRelated] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const p = await fetchPayment(id)
        setPayment(p)
        if (p?.porosia?.porosiId) {
          const list = await fetchPaymentsByOrder(p.porosia.porosiId)
          setRelated(list || [])
        }
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (values) => {
    if (!payment) return
    setSubmitting(true)
    try {
      const payload = {
        porosia: { porosiId: Number(values.porosia?.porosiId || values['porosia.porosiId']) },
        shuma: Number(values.shuma),
        metodaPageses: values.metodaPageses,
        statusi: values.statusi,
      }
      const updated = await updatePayment(payment.id, payload)
      setPayment(updated)
      notify(MESSAGES.saveSuccess)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (p) => {
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return
    try {
      await deletePayment(p.id)
      notify(MESSAGES.deleteSuccess)
      navigate('/payments')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) return <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.pagesat}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Pagesa #{payment?.id}</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Shikoni dhe ndryshoni informacionin e pagesës.</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <PaymentForm defaultValues={{ porosia: { porosiId: payment?.porosia?.porosiId }, shuma: payment?.shuma, metodaPageses: payment?.metodaPageses, statusi: payment?.statusi }} orders={[payment?.porosia]} onSubmit={handleUpdate} onCancel={() => navigate('/payments')} submitting={submitting} />
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <h2 className="text-lg font-semibold">{FIELD.paymentHistory} — {FIELD.order} #{payment?.porosia?.porosiId}</h2>
          <div className="mt-4">
            <PaymentTable payments={related} onDelete={handleDelete} />
          </div>
        </div>
      </div>
  )
}
