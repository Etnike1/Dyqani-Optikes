import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { fetchProducts } from '../../api/products'

export default function SupplierForm({ defaultValues = {}, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm({ defaultValues })
  const [products, setProducts] = useState([])

  useEffect(() => {
    async function load() {
      try {
        const p = await fetchProducts()
        setProducts(p || [])
      } catch (err) {}
    }
    load()
  }, [])

  // product multi-select -> store as comma-separated names in produktetFurnizuara
  const selected = watch('produktetFurnizuara') || ''
  const selectedSet = new Set(selected.split(',').map(x => x.trim()).filter(Boolean))

  const toggleProduct = (name) => {
    const next = new Set(selectedSet)
    if (next.has(name)) next.delete(name)
    else next.add(name)
    setValue('produktetFurnizuara', Array.from(next).join(', '))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm text-slate-700">Company name</label>
        <input {...register('emriKompanise', { required: true })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        {errors.emriKompanise && <p className="text-xs text-red-600">Company name is required.</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700">Contact person</label>
          <input {...register('personiKontaktit')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="block text-sm text-slate-700">Phone</label>
          <input {...register('telefoni')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-700">Email</label>
        <input type="email" {...register('email')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm text-slate-700">Products supplied (select to toggle)</label>
        <div className="mt-2 flex flex-wrap gap-2">
          {products.map(p => {
            const name = p.emriProduktit
            return (
              <button key={p.produktId} type="button" onClick={() => toggleProduct(name)} className={`inline-flex items-center rounded-full px-3 py-1 text-xs ${selectedSet.has(name) ? 'bg-primary text-white' : 'bg-slate-100 text-slate-700'}`}>
                {name}
              </button>
            )
          })}
        </div>
        <input type="hidden" {...register('produktetFurnizuara')} />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="rounded-3xl bg-primary px-4 py-2 text-sm font-semibold text-white">{submitting ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={onCancel} className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm">Cancel</button>
      </div>
    </form>
  )
}
