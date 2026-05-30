import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import DeliveryStatusBadge from '../components/Deliveries/DeliveryStatusBadge'
import { useToast } from '../components/ui/ToastProvider'
import { fetchDelivery, deleteDelivery } from '../api/deliveries'
import { ACTIONS, DETAIL, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

export default function DeliveryDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [delivery, setDelivery] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const result = await fetchDelivery(id)
        setDelivery(result)
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, notify])

  const handleDelete = async () => {
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return

    try {
      await deleteDelivery(delivery.dergesaId)
      notify(MESSAGES.deleteSuccess)
      navigate('/deliveries')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) {
    return (
      <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>
    )
  }

  if (!delivery) {
    return (
      <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <p className="text-slate-500">{DETAIL.notFound}</p>
        </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.dergesat}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Dërgesa #{delivery.dergesaId}</h1>
              <p className="mt-2 text-sm leading-6 text-slate-500">Informacioni i dërgesës, gjurmimit dhe orarit.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to="/deliveries" className="rounded-3xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                {ACTIONS.back}
              </Link>
              <button onClick={handleDelete} className="rounded-3xl bg-red-600 px-5 py-3 text-sm font-semibold text-white hover:bg-red-700">
                {ACTIONS.delete}
              </button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.order}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">#{delivery.porosia?.porosiId}</p>
                <p className="mt-1 text-sm text-slate-600">{delivery.porosia?.klient?.emri} {delivery.porosia?.klient?.mbiemri}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.status}</p>
                <div className="mt-2"><DeliveryStatusBadge status={delivery.statusiDergeses} /></div>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.carrier}</p>
                <p className="text-sm text-slate-700">{delivery.kompaniaTransportit || STATUS.notAssigned}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.trackingNumber}</p>
                <p className="text-sm text-slate-700">{delivery.numriGjurmimit || STATUS.notAssigned}</p>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.deliveryAddress}</p>
                <p className="text-sm text-slate-700">{delivery.adresaDergeses}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.shipDate}</p>
                <p className="text-sm text-slate-700">{delivery.dataNisjes || STATUS.pending}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.arrivalDate}</p>
                <p className="text-sm text-slate-700">{delivery.dataArritjes || STATUS.pending}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.shipmentOverview}</p>
            <div className="mt-6 space-y-4 text-sm text-slate-600">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{FIELD.customer}</p>
                <p>{delivery.porosia?.klient?.emri} {delivery.porosia?.klient?.mbiemri}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{FIELD.orderDate}</p>
                <p>{delivery.porosia?.dataPorosise || MESSAGES.unknown}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{FIELD.status}</p>
                <p>{delivery.statusiDergeses || STATUS.pending}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
