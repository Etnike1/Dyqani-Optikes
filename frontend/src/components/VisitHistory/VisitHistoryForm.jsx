import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES } from '../../constants/labels.sq'
import Button from '../ui/Button'

export default function VisitHistoryForm({
  defaultValues,
  customers = [],
  checkups = [],
  onSubmit,
  onCancel,
  isSubmitting,
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      klienti: { id: '' },
      kontrolli: { kontrollId: '' },
      dataVizites: '',
      pershkrimi: '',
      rekomandimi: '',
    },
  })

  useEffect(() => {
    if (!defaultValues) return
    reset({
      klienti: { id: getKlientId(defaultValues.klienti) ?? '' },
      kontrolli: { kontrollId: defaultValues.kontrolli?.kontrollId ?? '' },
      dataVizites: defaultValues.dataVizites ?? '',
      pershkrimi: defaultValues.pershkrimi ?? '',
      rekomandimi: defaultValues.rekomandimi ?? '',
    })
  }, [defaultValues, reset])

  const submit = (values) => {
    onSubmit({
      klienti: values.klienti?.id ? { id: Number(values.klienti.id) } : null,
      kontrolli: values.kontrolli?.kontrollId ? { kontrollId: Number(values.kontrolli.kontrollId) } : null,
      dataVizites: values.dataVizites || null,
      pershkrimi: values.pershkrimi || '',
      rekomandimi: values.rekomandimi || '',
    })
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="panel space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="field-label">
          Klienti
          <select {...register('klienti.id', { required: MESSAGES.required })} className="field-input">
            <option value="">Zgjidhni klientin</option>
            {customers.map((c) => (
              <option key={getKlientId(c)} value={getKlientId(c)}>
                {klientLabel(c)}
              </option>
            ))}
          </select>
          {errors.klienti?.id && <p className="mt-1 text-xs text-red-400">{errors.klienti.id.message}</p>}
        </label>

        <label className="field-label">
          Kontrolli i syve
          <select {...register('kontrolli.kontrollId')} className="field-input">
            <option value="">Pa kontroll (opsionale)</option>
            {checkups.map((k) => (
              <option key={k.kontrollId} value={k.kontrollId}>
                #{k.kontrollId} — {k.dataKontrollit} — {klientLabel(k.klient)}
              </option>
            ))}
          </select>
        </label>

        <label className="field-label">
          dataVizites
          <input type="date" {...register('dataVizites')} className="field-input" />
        </label>
      </div>

      <label className="field-label block">
        pershkrimi
        <textarea {...register('pershkrimi')} rows={3} className="field-input" placeholder="Përshkrimi i vizitës" />
      </label>

      <label className="field-label block">
        rekomandimi
        <textarea {...register('rekomandimi')} rows={3} className="field-input" placeholder="Rekomandimi" />
      </label>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? MESSAGES.loading : 'Ruaj'}
        </Button>
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Anulo
          </Button>
        )}
      </div>
    </form>
  )
}
