import React from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'
import Button from '../ui/Button'

export default function NotificationForm({ notification, customers = [], onSubmit, isSubmitting }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      klienti: { id: getKlientId(notification?.klienti) ?? '' },
      mesazhi: notification?.mesazhi ?? '',
      lexuar: notification?.lexuar ?? false,
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel grid gap-6">
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
      </label>
      <label className="field-label flex items-center gap-3">
        <input type="checkbox" {...register('lexuar')} className="h-4 w-4" />
        lexuar
      </label>
      <label className="field-label">
        mesazhi
        <textarea {...register('mesazhi', { required: MESSAGES.required })} rows={5} className="field-input" />
      </label>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? MESSAGES.loading : ACTIONS.save}
      </Button>
    </form>
  )
}
