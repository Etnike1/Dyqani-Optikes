import React from 'react'
import { useForm } from 'react-hook-form'

export default function LensForm({ defaultValues = {}, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-700">Type</label>
        <input {...register('llojiLentes', { required: true })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        {errors.llojiLentes && <p className="text-xs text-red-600">Type is required.</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label className="block text-sm text-slate-700">Producer</label>
          <input {...register('prodhuesi')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-slate-700">Index</label>
          <input {...register('indeksi')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-slate-700">Coating</label>
          <input {...register('veshja')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700">Price</label>
          <input type="number" step="0.01" {...register('cmimi', { required: true, min: 0 })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          {errors.cmimi && <p className="text-xs text-red-600">Enter a valid price.</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-700">Stock quantity</label>
          <input type="number" {...register('sasiaStok', { min: 0 })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-white">{submitting ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm">Cancel</button>
      </div>
    </form>
  )
}
