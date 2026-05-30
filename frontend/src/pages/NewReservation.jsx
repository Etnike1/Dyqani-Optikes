import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReservationForm from '../components/Reservations/ReservationForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCustomers } from '../api/customers'
import { fetchEmployees } from '../api/employees'
import { createReservation } from '../api/reservations'
import { klientRef, punonjesRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'

export default function NewReservation() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [customers, setCustomers] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const [customerData, employeeData] = await Promise.all([fetchCustomers(), fetchEmployees()])
        setCustomers(customerData || [])
        setEmployees(employeeData || [])
      } catch {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [notify])

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      const payload = {
        klienti: klientRef(values.klienti?.id),
        punonjesi: punonjesRef(values.punonjesi?.punonjesId),
        dataRezervimit: values.dataRezervimit,
        oraRezervimit: values.oraRezervimit,
        statusi: values.statusi,
        shenime: values.shenime || '',
      }
      const created = await createReservation(payload)
      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/reservations/${created.rezervimId}`)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={NAV.rezervimet} title="Rezervim i ri" description="Planifikoni një rezervim me klient dhe punonjës." />
      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <ReservationForm
          customers={customers}
          employees={employees}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/reservations')}
          submitting={submitting}
        />
      )}
    </div>
  )
}
