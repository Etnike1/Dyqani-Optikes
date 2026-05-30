import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import VisitHistoryForm from '../components/VisitHistory/VisitHistoryForm'
import { fetchVisitHistoryById, updateVisitHistory, deleteVisitHistory } from '../api/visitHistory'
import { fetchCustomers } from '../api/customers'
import { fetchCheckups } from '../api/checkups'
import { useToast } from '../components/ui/ToastProvider'
import { klientLabel } from '../utils/entityRefs'
import { ACTIONS, MESSAGES, NAV } from '../constants/labels.sq'

export default function VisitHistoryDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [record, setRecord] = useState(null)
  const [customers, setCustomers] = useState([])
  const [checkups, setCheckups] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        const [data, klientet, kontrollet] = await Promise.all([
          fetchVisitHistoryById(id),
          fetchCustomers(),
          fetchCheckups(),
        ])
        setRecord(data)
        setCustomers(klientet || [])
        setCheckups(kontrollet || [])
      } catch {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (payload) => {
    setSubmitting(true)
    try {
      const updated = await updateVisitHistory(id, payload)
      setRecord(updated)
      setEditing(false)
      notify(MESSAGES.saveSuccess, 'success')
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteVisitHistory(id)
      notify(MESSAGES.deleteSuccess, 'success')
      navigate('/visit-history')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) return <LoadingSpinner label={MESSAGES.loading} />
  if (!record) return <p className="panel">{MESSAGES.loadError}</p>

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.historikuVizitave}
        title={`Historiku #${record.historikuId}`}
        description={klientLabel(record.klienti)}
      >
        <Link to="/visit-history" className="btn-ghost">
          {ACTIONS.back}
        </Link>
        {!editing && (
          <>
            <button type="button" className="btn-primary" onClick={() => setEditing(true)}>
              {ACTIONS.edit}
            </button>
            <button type="button" className="rounded-xl bg-red-600 px-4 py-2.5 text-sm text-white" onClick={handleDelete}>
              {ACTIONS.delete}
            </button>
          </>
        )}
      </PageHeader>

      {editing ? (
        <VisitHistoryForm
          defaultValues={record}
          customers={customers}
          checkups={checkups}
          onSubmit={handleUpdate}
          onCancel={() => setEditing(false)}
          isSubmitting={submitting}
        />
      ) : (
        <dl className="panel grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs uppercase text-[var(--muted)]">dataVizites</dt>
            <dd className="mt-1 font-medium">{record.dataVizites ?? '—'}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase text-[var(--muted)]">kontrolli</dt>
            <dd className="mt-1 font-medium">
              {record.kontrolli?.kontrollId ? (
                <Link to={`/checkups/${record.kontrolli.kontrollId}`} className="text-primary-400 hover:underline">
                  #{record.kontrolli.kontrollId}
                </Link>
              ) : (
                '—'
              )}
            </dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase text-[var(--muted)]">pershkrimi</dt>
            <dd className="mt-1 whitespace-pre-wrap">{record.pershkrimi ?? '—'}</dd>
          </div>
          <div className="sm:col-span-2">
            <dt className="text-xs uppercase text-[var(--muted)]">rekomandimi</dt>
            <dd className="mt-1 whitespace-pre-wrap">{record.rekomandimi ?? '—'}</dd>
          </div>
        </dl>
      )}
    </div>
  )
}
