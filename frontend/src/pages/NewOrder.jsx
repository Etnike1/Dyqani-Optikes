import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import OrderForm from '../components/Orders/OrderForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { createOrder, createOrderDetail, fetchOrderCustomers, fetchOrderProducts, fetchOrderPrescriptions, fetchOrderEmployees } from '../api/orders'
import { klientRef, punonjesRef, recetaRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'
import PageHeader from '../components/ui/PageHeader'

export default function NewOrderPage() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [customers, setCustomers] = useState([])
  const [products, setProducts] = useState([])
  const [prescriptions, setPrescriptions] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [customerData, productData, prescriptionData, employeeData] = await Promise.all([
          fetchOrderCustomers(),
          fetchOrderProducts(),
          fetchOrderPrescriptions(),
          fetchOrderEmployees(),
        ])
        setCustomers(customerData || [])
        setProducts(productData || [])
        setPrescriptions(prescriptionData || [])
        setEmployees(employeeData || [])
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleSubmit = async ({ klient, receta, punonjesi, statusi, dataGatshmerise, items, totali }) => {
    setSubmitting(true)
    try {
      const createdOrder = await createOrder({
        klient: klientRef(klient),
        receta: recetaRef(receta),
        punonjesi: punonjesRef(punonjesi),
        statusi,
        dataGatshmerise: dataGatshmerise || null,
        totali,
      })

      await Promise.all(
        items.map((item) =>
          createOrderDetail({
            sasia: Number(item.sasia),
            cmimiNjesi: Number(item.cmimiNjesi),
            porosia: { porosiId: createdOrder.porosiId },
            produkti: { produktId: Number(item.produkti.produktId) },
          })
        )
      )

      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/orders/${createdOrder.porosiId}`)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={NAV.porosite} title="Porosi e re" description="Krijoni porosi me klient, recetë, punonjës dhe artikuj." />

        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : error ? (
          <div className="panel text-sm text-red-400">{error}</div>
        ) : (
          <OrderForm
              customers={customers}
              products={products}
              prescriptions={prescriptions}
              employees={employees}
              onSubmit={handleSubmit}
              onCancel={() => navigate('/orders')}
              isSubmitting={submitting}
          />
        )}
    </div>
  )
}
