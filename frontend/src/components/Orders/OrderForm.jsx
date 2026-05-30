import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'
import { formatCurrency } from '../../utils/formatCurrency'
import Button from '../ui/Button'

const STATUS_OPTIONS = [
  { value: 'Ne proces', label: 'Ne proces' },
  { value: 'E perfunduar', label: 'E perfunduar' },
  { value: 'Anuluar', label: 'Anuluar' },
]

function formatPrice(value) {
  if (value == null || value === '') return ''
  return Number(value).toFixed(2)
}

export default function OrderForm({ defaultValues, customers, prescriptions, employees, products, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      klient: getKlientId(defaultValues?.klient) || '',
      receta: defaultValues?.receta?.receteId || '',
      punonjesi: defaultValues?.punonjesi?.punonjesId || '',
      statusi: defaultValues?.statusi || 'Ne proces',
      dataGatshmerise: defaultValues?.dataGatshmerise || '',
    },
  })

  const [items, setItems] = useState(defaultValues?.items || [])
  const [formError, setFormError] = useState('')

  useEffect(() => {
    setItems(defaultValues?.items || [])
  }, [defaultValues])

  const setItem = (index, changes) => {
    setItems((current) => current.map((item, idx) => (idx === index ? { ...item, ...changes } : item)))
  }

  const addItem = () => {
    setItems((current) => [
      ...current,
      {
        detajId: null,
        produkti: null,
        lente: null,
        sasia: 1,
        cmimiNjesi: 0,
      },
    ])
  }

  const removeItem = (index) => {
    setItems((current) => current.filter((_, idx) => idx !== index))
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + ((Number(item.sasia) || 0) * (Number(item.cmimiNjesi) || 0)), 0),
    [items]
  )

  const handleProductChange = (index, produktId) => {
    const product = products.find((item) => item.produktId === Number(produktId))
    setItem(index, {
      produkti: product ? { produktId: product.produktId, emriProduktit: product.emriProduktit, cmimi: product.cmimi } : null,
      lente: null,
      cmimiNjesi: product ? Number(product.cmimi) : 0,
    })
  }

  const submitHandler = async (values) => {
    if (items.length === 0) {
      setFormError('Shtoni të paktën një artikull porosie.')
      return
    }

    const hasValidItems = items.every((item) => item.produkti?.produktId && Number(item.sasia) > 0 && Number(item.cmimiNjesi) > 0)
    if (!hasValidItems) {
      setFormError('Çdo artikull duhet të ketë produkt, sasi dhe cmimiNjesi.')
      return
    }

    setFormError('')
    onSubmit({
      ...values,
      items,
      totali: subtotal,
    })
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-700">
          klient
          <select
            {...register('klient', { required: MESSAGES.required })}
            className="field-input"
          >
            <option value="">Zgjidhni klientin</option>
            {customers.map((customer) => (
              <option key={getKlientId(customer)} value={getKlientId(customer)}>
                {klientLabel(customer)}
              </option>
            ))}
          </select>
          {errors.klient && <p className="text-xs text-red-600">{errors.klient.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Prescription
          <select
            {...register('receta', { required: 'Select a prescription' })}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Choose prescription</option>
            {prescriptions.map((prescription) => (
              <option key={prescription.receteId} value={prescription.receteId}>
                {prescription.mjekuEmri || 'Prescription'} — {new Date(prescription.dataRecetes).toLocaleDateString('en-GB')}
              </option>
            ))}
          </select>
          {errors.receta && <p className="text-xs text-red-600">{errors.receta.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Employee
          <select
            {...register('punonjesi', { required: 'Select an employee' })}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Choose employee</option>
            {employees.map((employee) => (
              <option key={employee.punonjesId} value={employee.punonjesId}>
                {employee.emri} {employee.mbiemri}
              </option>
            ))}
          </select>
          {errors.punonjesi && <p className="text-xs text-red-600">{errors.punonjesi.message}</p>}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="space-y-2 text-sm text-slate-700">
          Status
          <select
            {...register('statusi', { required: 'Select a status' })}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.statusi && <p className="text-xs text-red-600">{errors.statusi.message}</p>}
        </label>

        <label className="space-y-2 text-sm text-slate-700">
          Due date
          <input
            type="date"
            {...register('dataGatshmerise')}
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <div className="space-y-2 text-sm text-slate-700">
          <p className="font-medium">Order total</p>
          <p className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
            {formatCurrency(subtotal)}
          </p>
        </div>
      </div>

      <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Order items</h2>
            <p className="mt-1 text-sm text-slate-500">Add products, quantities and unit prices for the invoice.</p>
          </div>
          <Button type="button" className="bg-slate-900 hover:bg-slate-800" onClick={addItem}>
            Add item
          </Button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center text-sm text-slate-500">
            No items yet. Add products to assemble the order.
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item, index) => (
              <div key={index} className="grid gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-4 sm:grid-cols-[1.5fr_0.8fr_0.8fr_0.7fr_auto]">
                <label className="space-y-2 text-sm text-slate-700">
                  Product
                  <select
                    value={item.produkti?.produktId ?? ''}
                    onChange={(event) => handleProductChange(index, event.target.value)}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Select product</option>
                    {products.map((product) => (
                      <option key={product.produktId} value={product.produktId}>
                        {product.emriProduktit} — {formatCurrency(product.cmimi)}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Quantity
                  <input
                    type="number"
                    min="1"
                    value={item.sasia}
                    onChange={(event) => setItem(index, { sasia: Number(event.target.value) })}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <label className="space-y-2 text-sm text-slate-700">
                  Unit price
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formatPrice(item.cmimiNjesi)}
                    onChange={(event) => setItem(index, { cmimiNjesi: Number(event.target.value) })}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  />
                </label>
                <div className="space-y-2 text-sm text-slate-700">
                  <p className="font-medium">Line total</p>
                  <p className="rounded-3xl border border-slate-200 bg-slate-100 px-4 py-3 text-sm text-slate-900">
                    {formatCurrency((Number(item.sasia) || 0) * (Number(item.cmimiNjesi) || 0))}
                  </p>
                </div>
                <div className="flex items-end justify-end">
                  <button
                    type="button"
                    onClick={() => removeItem(index)}
                    className="rounded-3xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-100"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {formError ? <div className="rounded-[28px] border border-red-200 bg-red-50 p-4 text-sm text-red-700">{formError}</div> : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
        <Button type="submit" className="px-5 py-3" disabled={isSubmitting}>
          {isSubmitting ? 'Saving order...' : 'Save order'}
        </Button>
      </div>
    </form>
  )
}
