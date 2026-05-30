import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PrescriptionForm from '../components/Prescriptions/PrescriptionForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCustomers } from '../api/customers'
import { createPrescription } from '../api/prescriptions'
import { klientRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'

export default function NewPrescription() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchCustomers()
        setCustomers(data || [])
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
        mjekuEmri: values.mjekuEmri,
        dataRecetes: values.dataRecetes || null,
        syriDjathteSfera: values.syriDjathteSfera ? Number(values.syriDjathteSfera) : null,
        syriDjathteCilindri: values.syriDjathteCilindri ? Number(values.syriDjathteCilindri) : null,
        syriMajteSfera: values.syriMajteSfera ? Number(values.syriMajteSfera) : null,
        syriMajteCilindri: values.syriMajteCilindri ? Number(values.syriMajteCilindri) : null,
        distancaPupilare: values.distancaPupilare ? Number(values.distancaPupilare) : null,
        shenimet: values.shenimet || '',
      }
      const created = await createPrescription(payload)
      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/prescriptions/${created.receteId}`)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.recetat}
        title="Recetë e re"
        description="Regjistroni matjet e syve të lidhura me klientin."
      />
      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <PrescriptionForm
          customers={customers}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/prescriptions')}
          submitting={submitting}
        />
      )}
    </div>
  )
}
