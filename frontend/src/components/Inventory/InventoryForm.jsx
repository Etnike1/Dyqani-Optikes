import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { ACTIONS, FIELDS, MESSAGES, VALIDATION } from '../../constants/labels.sq'

export default function InventoryForm({ defaultValues, products = [], onSubmit, onCancel, isSubmitting }) {
  const preparedValues = useMemo(
    () => ({
      produktId: defaultValues?.produkt?.produktId ?? '',
      sasiaAktuale: defaultValues?.sasiaAktuale ?? 0,
      sasiaMinimale: defaultValues?.sasiaMinimale ?? 0,
      adjustment: 0,
      ...(defaultValues || {}),
    }),
    [defaultValues]
  )

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({ defaultValues: preparedValues })

  const adjustment = Number(watch('adjustment') || 0)
  const current = Number(watch('sasiaAktuale') || 0)
  const adjustedStock = current + adjustment

  useEffect(() => {
    reset(preparedValues)
  }, [preparedValues, reset])

  const handleFormSubmit = (values) => {
    const payload = {
      produkt: { produktId: Number(values.produktId) },
      sasiaAktuale: Number(values.sasiaAktuale) + Number(values.adjustment || 0),
      sasiaMinimale: Number(values.sasiaMinimale),
    }
    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.product}</span>
          <select
            {...register('produktId', { required: VALIDATION.selectProduct })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">{FIELDS.chooseProduct}</option>
            {products.map((product) => (
              <option key={product.produktId} value={product.produktId}>
                {product.emriProduktit} – {product.marka || MESSAGES.unknownBrand}
              </option>
            ))}
          </select>
          {errors.produktId && <p className="mt-2 text-sm text-rose-600">{errors.produktId.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.minimumStock}</span>
          <input
            type="number"
            {...register('sasiaMinimale', {
              required: VALIDATION.minimumStockRequired,
              min: { value: 0, message: VALIDATION.minZeroOrHigher },
            })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.sasiaMinimale && <p className="mt-2 text-sm text-rose-600">{errors.sasiaMinimale.message}</p>}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.currentStock}</span>
          <input
            type="number"
            {...register('sasiaAktuale', {
              required: VALIDATION.currentStockRequired,
              min: { value: 0, message: VALIDATION.minZeroOrHigher },
            })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.sasiaAktuale && <p className="mt-2 text-sm text-rose-600">{errors.sasiaAktuale.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.adjustStock}</span>
          <input
            type="number"
            step="1"
            {...register('adjustment')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <p className="mt-2 text-sm text-slate-500">{MESSAGES.stockAdjustHint}</p>
        </label>

        <div className="flex flex-col justify-end rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">{FIELDS.afterAdjustment}</p>
          <p className="mt-3 text-2xl font-semibold text-slate-900">{adjustedStock}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          {ACTIONS.cancel}
        </button>
        <Button type="submit" className="px-5 py-3" disabled={isSubmitting}>
          {isSubmitting ? ACTIONS.saving : ACTIONS.saveInventory}
        </Button>
      </div>
    </form>
  )
}
