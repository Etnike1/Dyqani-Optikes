import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeliveryForm from '../components/Deliveries/DeliveryForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchOrders } from '../api/orders'
import { createDelivery } from '../api/deliveries'
import { MESSAGES, NAV } from '../constants/labels.sq'

export default function NewDelivery() {
  const { notify } = useToast()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const orderData = await fetchOrders()
        setOrders(orderData || [])
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleSubmit = async (values) => {
    const payload = {
      porosia: { porosiId: Number(values.porosia?.porosiId) },
      kompaniaTransportit: values.kompaniaTransportit,
      numriGjurmimit: values.numriGjurmimit,
      adresaDergeses: values.adresaDergeses,
      dataNisjes: values.dataNisjes || null,
      dataArritjes: values.dataArritjes || null,
      statusiDergeses: values.statusiDergeses,
    }

    try {
      setSubmitting(true)
      const delivery = await createDelivery(payload)
      notify(MESSAGES.saveSuccess)
      navigate(`/deliveries/${delivery.dergesaId}`)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.dergesat}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Dërgesë e re</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Lidhni një porosi, vendosni transportin dhe datat e dërgesës.</p>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : (
          <DeliveryForm orders={orders} onSubmit={handleSubmit} isSubmitting={submitting} />
        )}
      </div>
  )
}
