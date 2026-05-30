import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getKlientId, klientLabel } from '../../utils/entityRefs'
import { MESSAGES, ACTIONS } from '../../constants/labels.sq'
import Button from '../ui/Button'

export default function WarrantyForm({ warranty, orders = [], customers = [], products = [], lenses = [], onSubmit, isSubmitting }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      dataFillimit: '',
      dataSkadimit: '',
      kushtet: '',
      porosia: { porosiId: '' },
      klienti: { id: '' },
      produkti: { produktId: '' },
      lentet: { lenteId: '' },
    },
  })

  useEffect(() => {
    if (!warranty) return
    reset({
      dataFillimit: warranty.dataFillimit || '',
      dataSkadimit: warranty.dataSkadimit || '',
      kushtet: warranty.kushtet || '',
      porosia: { porosiId: warranty.porosia?.porosiId || '' },
      klienti: { id: getKlientId(warranty.klienti) ?? '' },
      produkti: { produktId: warranty.produkti?.produktId || '' },
      lentet: { lenteId: warranty.lentet?.lenteId || '' },
    })
  }, [warranty, reset])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="panel grid gap-6">
      <div className="grid gap-6 lg:grid-cols-2">
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
        <label className="field-label">
          porosia
          <select {...register('porosia.porosiId', { required: MESSAGES.required })} className="field-input">
            <option value="">Zgjidhni porosinë</option>
            {orders.map((order) => (
              <option key={order.porosiId} value={order.porosiId}>
                #{order.porosiId} — {klientLabel(order.klient)}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="field-label">
          dataFillimit
          <input type="date" {...register('dataFillimit', { required: MESSAGES.required })} className="field-input" />
        </label>
        <label className="field-label">
          dataSkadimit
          <input type="date" {...register('dataSkadimit', { required: MESSAGES.required })} className="field-input" />
        </label>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <label className="field-label">
          produkti
          <select {...register('produkti.produktId')} className="field-input">
            <option value="">Pa produkt</option>
            {products.map((product) => (
              <option key={product.produktId} value={product.produktId}>
                {product.emriProduktit}
              </option>
            ))}
          </select>
        </label>
        <label className="field-label">
          lentet
          <select {...register('lentet.lenteId')} className="field-input">
            <option value="">Pa lente</option>
            {lenses.map((lens) => (
              <option key={lens.lenteId} value={lens.lenteId}>
                {lens.llojiLentes} — {lens.prodhuesi}
              </option>
            ))}
          </select>
        </label>
      </div>
      <label className="field-label">
        kushtet
        <textarea {...register('kushtet', { required: MESSAGES.required })} rows={5} className="field-input" />
      </label>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? MESSAGES.loading : ACTIONS.save}
      </Button>
    </form>
  )
}
