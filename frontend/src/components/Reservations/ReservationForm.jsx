import React from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'

const STATUS_OPTIONS = [
  { value: 'Ne pritje', label: 'Ne pritje' },
  { value: 'Konfirmuar', label: 'Konfirmuar' },
  { value: 'E perfunduar', label: 'E perfunduar' },
  { value: 'Anuluar', label: 'Anuluar' },
]

export default function ReservationForm({ customers = [], employees = [], defaultValues = {}, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      klienti: { id: getKlientId(defaultValues?.klienti) ?? '' },
      punonjesi: { punonjesId: defaultValues?.punonjesi?.punonjesId ?? '' },
      dataRezervimit: defaultValues?.dataRezervimit ?? '',
      oraRezervimit: defaultValues?.oraRezervimit ?? '',
      statusi: defaultValues?.statusi ?? 'Ne pritje',
      shenime: defaultValues?.shenime ?? '',
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="field-label">
          klienti
          <select {...register('klienti.id', { required: MESSAGES.required })} className="field-input">
            <option value="">Zgjidhni klientin</option>
            {customers.map((customer) => (
              <option key={getKlientId(customer)} value={getKlientId(customer)}>
                {klientLabel(customer)}
              </option>
            ))}
          </select>
          {errors.klienti && <p className="mt-1 text-xs text-red-400">{errors.klienti.id?.message || MESSAGES.required}</p>}
        </label>
        <label className="field-label">
          punonjesi
          <select {...register('punonjesi.punonjesId', { required: MESSAGES.required })} className="field-input">
            <option value="">Zgjidhni punonjësin</option>
            {employees.map((employee) => (
              <option key={employee.punonjesId} value={employee.punonjesId}>
                {`${employee.emri} ${employee.mbiemri}`}
              </option>
            ))}
          </select>
          {errors.punonjesi && (
            <p className="mt-1 text-xs text-red-400">{errors.punonjesi.punonjesId?.message || MESSAGES.required}</p>
          )}
        </label>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="field-label">
          dataRezervimit
          <input type="date" {...register('dataRezervimit', { required: MESSAGES.required })} className="field-input" />
        </label>
        <label className="field-label">
          oraRezervimit
          <input type="time" {...register('oraRezervimit', { required: MESSAGES.required })} className="field-input" />
        </label>
        <label className="field-label">
          statusi
          <select {...register('statusi', { required: MESSAGES.required })} className="field-input">
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="field-label">
        shenime
        <textarea rows={4} {...register('shenime')} className="field-input" />
      </label>
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
