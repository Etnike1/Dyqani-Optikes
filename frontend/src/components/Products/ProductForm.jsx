import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { ACTIONS, FIELDS, MESSAGES, VALIDATION } from '../../constants/labels.sq'

export default function ProductForm({ defaultValues, categories = [], onSubmit, onCancel, isSubmitting }) {
  const preparedValues = useMemo(
    () => ({
      emriProduktit: '',
      marka: '',
      modeli: '',
      cmimi: defaultValues?.cmimi != null ? String(defaultValues.cmimi) : '',
      sasiaStok: defaultValues?.sasiaStok ?? 0,
      ngjyra: '',
      materiali: '',
      aktiv: defaultValues?.aktiv ?? true,
      kategoriId: defaultValues?.kategori?.kategoriId ?? '',
      ...(defaultValues || {}),
    }),
    [defaultValues]
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: preparedValues })

  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    reset(preparedValues)
    setImageFile(null)
  }, [preparedValues, reset])

  useEffect(() => {
    if (!imageFile) {
      setImagePreview(null)
      return
    }

    const url = URL.createObjectURL(imageFile)
    setImagePreview(url)

    return () => URL.revokeObjectURL(url)
  }, [imageFile])

  const handleImageChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) return
    setImageFile(file)
  }

  const handleFormSubmit = (values) => {
    const payload = {
      ...values,
      cmimi: Number(values.cmimi),
      sasiaStok: Number(values.sasiaStok),
      aktiv: values.aktiv,
      kategori: { kategoriId: Number(values.kategoriId) },
    }

    onSubmit(payload)
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.productName}</span>
          <input
            type="text"
            {...register('emriProduktit', { required: VALIDATION.productNameRequired })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.emriProduktit && <p className="mt-2 text-sm text-rose-600">{errors.emriProduktit.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.category}</span>
          <select
            {...register('kategoriId', { required: VALIDATION.selectCategory })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">{FIELDS.selectCategory}</option>
            {categories.map((category) => (
              <option key={category.kategoriId} value={category.kategoriId}>
                {category.emriKategorise}
              </option>
            ))}
          </select>
          {errors.kategoriId && <p className="mt-2 text-sm text-rose-600">{errors.kategoriId.message}</p>}
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.brand}</span>
          <input
            type="text"
            {...register('marka')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.model}</span>
          <input
            type="text"
            {...register('modeli')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.color}</span>
          <input
            type="text"
            {...register('ngjyra')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.price}</span>
          <input
            type="number"
            step="0.01"
            min="0"
            {...register('cmimi', {
              required: VALIDATION.priceRequired,
              min: { value: 0.01, message: VALIDATION.pricePositive },
            })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.cmimi && <p className="mt-2 text-sm text-rose-600">{errors.cmimi.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.stock}</span>
          <input
            type="number"
            min="0"
            {...register('sasiaStok', {
              required: VALIDATION.stockRequired,
              min: { value: 0, message: VALIDATION.stockNonNegative },
            })}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          {errors.sasiaStok && <p className="mt-2 text-sm text-rose-600">{errors.sasiaStok.message}</p>}
        </label>

        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.material}</span>
          <input
            type="text"
            {...register('materiali')}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-slate-700">{FIELDS.productImage}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-2 w-full rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 outline-none"
          />
          <p className="mt-2 text-sm text-slate-500">{MESSAGES.imagePreviewNote}</p>
        </label>

        <label className="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3">
          <input type="checkbox" {...register('aktiv')} className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary" />
          <span className="text-sm font-medium text-slate-700">{FIELDS.activeProduct}</span>
        </label>
      </div>

      {imagePreview ? (
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-700">{FIELDS.preview}</p>
          <img src={imagePreview} alt={FIELDS.preview} className="mt-3 w-full rounded-3xl object-cover" />
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex justify-center rounded-3xl border border-slate-200 bg-slate-50 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          {ACTIONS.cancel}
        </button>
        <Button type="submit" className="px-5 py-3" disabled={isSubmitting}>
          {isSubmitting ? ACTIONS.saving : ACTIONS.saveProduct}
        </Button>
      </div>
    </form>
  )
}
