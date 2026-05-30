import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CheckupForm from '../components/Checkups/CheckupForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCustomers } from '../api/customers'
import { fetchEmployees } from '../api/employees'
import { createCheckup } from '../api/checkups'
import { klientRef, punonjesRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'

export default function NewCheckup() {
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
        klient: klientRef(values.klient?.id),
        punonjesi: punonjesRef(values.punonjesi?.punonjesId),
        receteId: values.receteId ? Number(values.receteId) : null,
        dataKontrollit: values.dataKontrollit || null,
        rezultati: values.rezultati || '',
        rekomandimi: values.rekomandimi || '',
      }
      const created = await createCheckup(payload)
      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/checkups/${created.kontrollId}`)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.kontrolletSyve}
        title="Kontroll i ri i syve"
        description="Krijoni një regjistrim kontrolli të lidhur me klientin dhe punonjësin."
      />
      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <CheckupForm
          customers={customers}
          employees={employees}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/checkups')}
          submitting={submitting}
        />
      )}
    </div>
  )
}
