import React from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'

export default function PrescriptionForm({ defaultValues = {}, customers = [], onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel space-y-4">
      <div>
        <label className="field-label">klient</label>
        <select {...register('klient.id', { required: MESSAGES.required })} className="field-input">
          <option value="">Zgjidhni klientin</option>
          {customers.map((c) => (
            <option key={getKlientId(c)} value={getKlientId(c)}>
              {klientLabel(c)}
            </option>
          ))}
        </select>
        {errors.klient && <p className="mt-1 text-xs text-red-400">{errors.klient.id?.message || MESSAGES.required}</p>}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">mjekuEmri</label>
          <input {...register('mjekuEmri')} className="field-input" />
        </div>
        <div>
          <label className="field-label">dataRecetes</label>
          <input type="date" {...register('dataRecetes')} className="field-input" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">syriDjathteSfera</label>
          <input type="number" step="0.01" {...register('syriDjathteSfera')} className="field-input" />
        </div>
        <div>
          <label className="field-label">syriDjathteCilindri</label>
          <input type="number" step="0.01" {...register('syriDjathteCilindri')} className="field-input" />
        </div>
        <div>
          <label className="field-label">syriMajteSfera</label>
          <input type="number" step="0.01" {...register('syriMajteSfera')} className="field-input" />
        </div>
        <div>
          <label className="field-label">syriMajteCilindri</label>
          <input type="number" step="0.01" {...register('syriMajteCilindri')} className="field-input" />
        </div>
      </div>

      <div>
        <label className="field-label">distancaPupilare</label>
        <input type="number" step="0.1" {...register('distancaPupilare')} className="field-input max-w-xs" />
      </div>

      <div>
        <label className="field-label">shenimet</label>
        <textarea {...register('shenimet')} className="field-input" rows={4} />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting ? MESSAGES.loading : ACTIONS.save}
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          {ACTIONS.cancel}
        </button>
      </div>
    </form>
  )
}
