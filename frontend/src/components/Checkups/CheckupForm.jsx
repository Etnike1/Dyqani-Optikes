import React from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'

export default function CheckupForm({ customers = [], employees = [], defaultValues = {}, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">klient</label>
          <select {...register('klient.id', { required: MESSAGES.required })} className="field-input">
            <option value="">Zgjidhni klientin</option>
            {customers.map((customer) => (
              <option key={getKlientId(customer)} value={getKlientId(customer)}>
                {klientLabel(customer)}
              </option>
            ))}
          </select>
          {errors.klient && <p className="mt-1 text-xs text-red-400">{errors.klient.id?.message || MESSAGES.required}</p>}
        </div>
        <div>
          <label className="field-label">punonjesi</label>
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
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">dataKontrollit</label>
          <input type="date" {...register('dataKontrollit', { required: MESSAGES.required })} className="field-input" />
          {errors.dataKontrollit && <p className="mt-1 text-xs text-red-400">{errors.dataKontrollit.message}</p>}
        </div>
        <div>
          <label className="field-label">receteId</label>
          <input type="number" {...register('receteId')} className="field-input" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label">rezultati</label>
          <textarea rows={5} {...register('rezultati', { required: MESSAGES.required })} className="field-input" />
          {errors.rezultati && <p className="mt-1 text-xs text-red-400">{errors.rezultati.message}</p>}
        </div>
        <div>
          <label className="field-label">rekomandimi</label>
          <textarea rows={5} {...register('rekomandimi')} className="field-input" />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
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
