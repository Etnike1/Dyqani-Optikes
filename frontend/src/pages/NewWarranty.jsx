import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import WarrantyForm from '../components/Warranties/WarrantyForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCustomers } from '../api/customers'
import { fetchOrders } from '../api/orders'
import { fetchProducts } from '../api/products'
import { fetchLenses } from '../api/lenses'
import { createWarranty } from '../api/warranties'
import { klientRef, porosiRef, produktRef, lenteRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'

export default function NewWarranty() {
  const { notify } = useToast()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])
  const [lenses, setLenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [customerData, orderData, productData, lensData] = await Promise.all([
          fetchCustomers(),
          fetchOrders(),
          fetchProducts(),
          fetchLenses(),
        ])
        setCustomers(customerData || [])
        setOrders(orderData || [])
        setProducts(productData || [])
        setLenses(lensData || [])
      } catch {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [notify])

  const handleSubmit = async (values) => {
    try {
      setSubmitting(true)
      const payload = {
        dataFillimit: values.dataFillimit,
        dataSkadimit: values.dataSkadimit,
        kushtet: values.kushtet,
        porosia: porosiRef(values.porosia?.porosiId),
        klienti: klientRef(values.klienti?.id),
        produkti: values.produkti?.produktId ? produktRef(values.produkti.produktId) : null,
        lentet: values.lentet?.lenteId ? lenteRef(values.lentet.lenteId) : null,
      }
      const warranty = await createWarranty(payload)
      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/warranties/${warranty.garanciaId}`)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.garancite}
        title="Garanci e re"
        description="Shtoni garanci me porosi, klient dhe produkt ose lente."
      />
      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <WarrantyForm
          customers={customers}
          orders={orders}
          products={products}
          lenses={lenses}
          onSubmit={handleSubmit}
          isSubmitting={submitting}
        />
      )}
    </div>
  )
}
