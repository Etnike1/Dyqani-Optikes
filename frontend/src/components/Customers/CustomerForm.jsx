import React from 'react'
import { useForm } from 'react-hook-form'
import Button from '../ui/Button'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'

const phonePattern = /^[0-9+\-() ]{7,20}$/

export default function CustomerForm({ defaultValues, onSubmit, onCancel, isSubmitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      emri: '',
      mbiemri: '',
      email: '',
      telefoni: '',
      dataLindjes: '',
      adresa: '',
      ...defaultValues,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          emri
          <input {...register('emri', { required: MESSAGES.required })} className="field-input" />
          {errors.emri && <p className="mt-1 text-xs text-red-400">{errors.emri.message}</p>}
        </label>
        <label className="field-label">
          mbiemri
          <input {...register('mbiemri', { required: MESSAGES.required })} className="field-input" />
          {errors.mbiemri && <p className="mt-1 text-xs text-red-400">{errors.mbiemri.message}</p>}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          email
          <input
            type="email"
            {...register('email', {
              required: MESSAGES.required,
              pattern: { value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/, message: 'Email i pavlefshëm' },
            })}
            className="field-input"
          />
          {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
        </label>
        <label className="field-label">
          telefoni
          <input
            {...register('telefoni', {
              required: MESSAGES.required,
              pattern: { value: phonePattern, message: 'Numri i telefonit nuk është valid' },
            })}
            className="field-input"
          />
          {errors.telefoni && <p className="mt-1 text-xs text-red-400">{errors.telefoni.message}</p>}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          dataLindjes
          <input type="date" {...register('dataLindjes')} className="field-input" />
        </label>
        <label className="field-label">
          adresa
          <input {...register('adresa')} className="field-input" />
        </label>
      </div>
      <div className="flex gap-3 sm:justify-end">
        <button type="button" onClick={onCancel} className="btn-ghost">
          {ACTIONS.cancel}
        </button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? MESSAGES.loading : ACTIONS.save}
        </Button>
      </div>
    </form>
  )
}
