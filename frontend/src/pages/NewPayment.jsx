import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PaymentForm from '../components/Payments/PaymentForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchOrders } from '../api/orders'
import { createPayment } from '../api/payments'
import { MESSAGES, NAV } from '../constants/labels.sq'

export default function NewPaymentPage() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchOrders()
        setOrders(data || [])
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        porosia: { porosiId: Number(values.porosia?.porosiId || values['porosia.porosiId']) },
        shuma: Number(values.shuma),
        metodaPageses: values.metodaPageses,
        statusi: values.statusi || 'E përfunduar'
      }
      const created = await createPayment(payload)
      notify(MESSAGES.saveSuccess)
      navigate(`/payments/${created.id}`)
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
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.pagesat}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Pagesë e re</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Lidhni pagesën me një porosi dhe regjistroni shumën dhe metodën.</p>
          </div>
        </div>

        {loading ? (
          <div className="mt-6"><LoadingSpinner label={MESSAGES.loading} /></div>
        ) : error ? (
          <div className="mt-6 rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">{error}</div>
        ) : (
          <div className="mt-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <PaymentForm orders={orders} onSubmit={handleSubmit} onCancel={() => navigate('/payments')} submitting={submitting} />
          </div>
        )}
      </div>
  )
}
