import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NotificationForm from '../components/Notifications/NotificationForm'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { fetchCustomers } from '../api/customers'
import { createNotification } from '../api/notifications'
import { klientRef } from '../utils/entityRefs'
import { NAV, MESSAGES } from '../constants/labels.sq'

export default function NewNotification() {
  const { notify } = useToast()
  const navigate = useNavigate()
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        setCustomers((await fetchCustomers()) || [])
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
        klienti: klientRef(values.klienti?.id),
        mesazhi: values.mesazhi,
        lexuar: values.lexuar || false,
      }
      const notification = await createNotification(payload)
      notify(MESSAGES.saveSuccess, 'success')
      navigate(`/notifications/${notification.njoftimId}`)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader eyebrow={NAV.njoftimet} title="Njoftim i ri" description="Dërgoni njoftim te klienti." />
      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <NotificationForm customers={customers} onSubmit={handleSubmit} isSubmitting={submitting} />
      )}
    </div>
  )
}
