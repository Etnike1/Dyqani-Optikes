import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { CheckCircle2, XCircle } from 'lucide-react'
import { ACTIONS, FIELDS, VALIDATION } from '../../constants/labels.sq'

export default function CategoryForm({ defaultValues, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      emriKategorise: '',
      pershkrimi: '',
      aktive: true,
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <label className="block text-sm text-slate-700">
        {FIELDS.categoryName}
        <input
          {...register('emriKategorise', { required: VALIDATION.categoryNameRequired })}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.emriKategorise && <p className="mt-2 text-xs text-red-600">{errors.emriKategorise.message}</p>}
      </label>

      <label className="block text-sm text-slate-700">
        {FIELDS.categoryDescription}
        <textarea
          rows="4"
          {...register('pershkrimi', { maxLength: { value: 220, message: VALIDATION.descriptionMax } })}
          className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
        />
        {errors.pershkrimi && <p className="mt-2 text-xs text-red-600">{errors.pershkrimi.message}</p>}
      </label>

      <label className="flex items-center gap-3 text-sm text-slate-700">
        <input
          type="checkbox"
          {...register('aktive')}
          className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary"
        />
        {FIELDS.activeCategory}
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <button type="button" onClick={onCancel} className="inline-flex items-center justify-center gap-2 rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <XCircle className="h-4 w-4" />
          {ACTIONS.cancel}
        </button>
        <Button type="submit" className="inline-flex items-center justify-center gap-2 px-5 py-3" disabled={isSubmitting}>
          <CheckCircle2 className="h-4 w-4" />
          {isSubmitting ? ACTIONS.saving : ACTIONS.saveCategory}
        </Button>
      </div>
    </form>
  )
}
