import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import VisitHistoryTable from '../components/VisitHistory/VisitHistoryTable'
import VisitHistoryForm from '../components/VisitHistory/VisitHistoryForm'
import { fetchVisitHistory, createVisitHistory, updateVisitHistory, deleteVisitHistory } from '../api/visitHistory'
import { fetchCustomers } from '../api/customers'
import { fetchCheckups } from '../api/checkups'
import { useToast } from '../components/ui/ToastProvider'
import { NAV, ACTIONS, MESSAGES } from '../constants/labels.sq'

export default function VisitHistoryPage() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [items, setItems] = useState([])
  const [customers, setCustomers] = useState([])
  const [checkups, setCheckups] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [search, setSearch] = useState('')

  const load = async () => {
    try {
      setLoading(true)
      const [history, klientet, kontrollet] = await Promise.all([
        fetchVisitHistory(),
        fetchCustomers(),
        fetchCheckups(),
      ])
      setItems(history || [])
      setCustomers(klientet || [])
      setCheckups(kontrollet || [])
    } catch {
      notify(MESSAGES.loadError, 'error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return items
    return items.filter((row) => {
      const klient = `${row.klienti?.emri ?? ''} ${row.klienti?.mbiemri ?? ''}`.toLowerCase()
      return (
        klient.includes(q) ||
        String(row.historikuId).includes(q) ||
        (row.pershkrimi ?? '').toLowerCase().includes(q)
      )
    })
  }, [items, search])

  const handleSubmit = async (payload) => {
    setSubmitting(true)
    try {
      if (editing) {
        const updated = await updateVisitHistory(editing.historikuId, payload)
        setItems((cur) => cur.map((r) => (r.historikuId === updated.historikuId ? updated : r)))
        notify(MESSAGES.saveSuccess, 'success')
      } else {
        const created = await createVisitHistory(payload)
        setItems((cur) => [created, ...cur])
        notify(MESSAGES.saveSuccess, 'success')
      }
      setModalOpen(false)
      setEditing(null)
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (row) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteVisitHistory(row.historikuId)
      setItems((cur) => cur.filter((r) => r.historikuId !== row.historikuId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.historikuVizitave}
        title="Historiku i vizitave"
        description="Regjistroni dhe menaxhoni vizitat e klientëve të lidhura me kontrollet e syve."
        onAction={() => {
          setEditing(null)
          setModalOpen(true)
        }}
        actionLabel={ACTIONS.new}
      />

      <div className="panel">
        <label className="field-label">
          Kërko
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="field-input mt-1 max-w-md"
            placeholder="Klient, pershkrimi, ID…"
          />
        </label>
      </div>

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : (
        <VisitHistoryTable
          items={filtered}
          onEdit={(row) => {
            setEditing(row)
            setModalOpen(true)
          }}
          onDelete={handleDelete}
        />
      )}

      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setEditing(null) }}>
        <h2 className="mb-4 text-xl font-semibold text-[var(--text)]">
          {editing ? 'Ndrysho historikun e vizitës' : 'Historik i ri vizite'}
        </h2>
        <VisitHistoryForm
          defaultValues={editing}
          customers={customers}
          checkups={checkups}
          onSubmit={handleSubmit}
          onCancel={() => { setModalOpen(false); setEditing(null) }}
          isSubmitting={submitting}
        />
      </Modal>
    </div>
  )
}
