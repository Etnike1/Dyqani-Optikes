import React from 'react'
import { useForm } from 'react-hook-form'

export default function PaymentForm({ defaultValues = {}, orders = [], onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-700">Order</label>
        <select {...register('porosia.porosiId', { required: true })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
          <option value="">Select order</option>
          {orders.map((o) => (
            <option key={o.porosiId} value={o.porosiId}>{`#${o.porosiId} - ${o.klient?.emri ?? ''} ${o.klient?.mbiemri ?? ''}`}</option>
          ))}
        </select>
        {errors.porosia && <p className="text-xs text-red-600">Order is required.</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-700">Amount</label>
        <input type="number" step="0.01" {...register('shuma', { required: true, min: 0.01 })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        {errors.shuma && <p className="text-xs text-red-600">Enter a valid amount.</p>}
      </div>

      <div>
        <label className="block text-sm text-slate-700">Method</label>
        <select {...register('metodaPageses', { required: true })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
          <option value="">Select method</option>
          <option value="Cash">Cash</option>
          <option value="Kartelë">Kartelë</option>
          <option value="Transfer">Transfer</option>
        </select>
      </div>

      <div>
        <label className="block text-sm text-slate-700">Status</label>
        <input {...register('statusi')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-teal-600">{submitting ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm">Cancel</button>
      </div>
    </form>
  )
}
