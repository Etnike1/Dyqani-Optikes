import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'

const STATUS_OPTIONS = ['Ne pritje', 'Konfirmuar', 'Ne transport', 'E dorëzuar', 'Anuluar']

export default function DeliveryForm({ delivery, orders = [], onSubmit, isSubmitting }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      porosia: { porosiId: delivery?.porosia?.porosiId ?? '' },
      kompaniaTransportit: delivery?.kompaniaTransportit ?? '',
      numriGjurmimit: delivery?.numriGjurmimit ?? '',
      adresaDergeses: delivery?.adresaDergeses ?? '',
      dataNisjes: delivery?.dataNisjes ?? '',
      dataArritjes: delivery?.dataArritjes ?? '',
      statusiDergeses: delivery?.statusiDergeses ?? 'Ne pritje',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="space-y-2 text-sm text-slate-600">
          Order
          <select
            {...register('porosia.porosiId', { required: true })}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select order</option>
            {orders.map((order) => (
              <option key={order.porosiId} value={order.porosiId}>
                #{order.porosiId} — {order.klient?.emri} {order.klient?.mbiemri}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          Carrier
          <input
            type="text"
            {...register('kompaniaTransportit', { required: true })}
            placeholder="Kompania e transportit"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          Tracking number
          <input
            type="text"
            {...register('numriGjurmimit', { required: true })}
            placeholder="Numri i gjurmimit"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          Delivery address
          <input
            type="text"
            {...register('adresaDergeses', { required: true })}
            placeholder="Adresa e dërgesës"
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          Ship date
          <input
            type="date"
            {...register('dataNisjes')}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600">
          Arrival date
          <input
            type="date"
            {...register('dataArritjes')}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="space-y-2 text-sm text-slate-600 lg:col-span-2">
          Status
          <select
            {...register('statusiDergeses')}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">Fill fields to save shipment details and track the delivery.</p>
        <Button type="submit" className="rounded-3xl px-6 py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save delivery'}
        </Button>
      </div>
    </form>
  )
}
