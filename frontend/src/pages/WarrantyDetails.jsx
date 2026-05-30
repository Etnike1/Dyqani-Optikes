import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchWarranty, deleteWarranty } from '../api/warranties'
import { ACTIONS, DETAIL, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

function WarrantyDetailRow({ label, value }) {
  return (
    <div className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-200 bg-white p-4 sm:grid-cols-4">
      <dt className="text-sm font-medium text-slate-500">{label}</dt>
      <dd className="col-span-1 text-sm font-semibold text-slate-900 sm:col-span-3">{value || '—'}</dd>
    </div>
  )
}

export default function WarrantyDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [warranty, setWarranty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchWarranty(id)
        setWarranty(data)
      } catch (err) {
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id, notify])

  const handleDelete = async () => {
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return

    try {
      await deleteWarranty(id)
      notify(MESSAGES.deleteSuccess)
      navigate('/warranties')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  const status = React.useMemo(() => {
    if (!warranty?.dataSkadimit) return STATUS.expired
    const now = new Date()
    const target = new Date(warranty.dataSkadimit)
    if (target < now) return STATUS.expired
    const days = Math.ceil((target - now) / (1000 * 60 * 60 * 24))
    return days <= 30 ? STATUS.expiringSoon : STATUS.active
  }, [warranty])

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.garancite}</p>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Garancia {id}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Shikoni kushtet, klientin dhe produktin e lidhur.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link to={`/warranties/${id}/edit`} className="inline-flex items-center justify-center rounded-3xl border border-slate-200 bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                {DETAIL.editWarranty}
              </Link>
              <button onClick={handleDelete} className="inline-flex items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {ACTIONS.delete}
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <WarrantyDetailRow label={FIELD.customer} value={warranty.klienti ? `${warranty.klienti.emri} ${warranty.klienti.mbiemri}` : MESSAGES.unknown} />
              <WarrantyDetailRow label={FIELD.order} value={warranty.porosia ? `#${warranty.porosia.porosiId}` : MESSAGES.unlinked} />
              <WarrantyDetailRow label={FIELD.item} value={warranty.produkti?.emri || warranty.lentet?.emri || MESSAGES.unknown} />
              <WarrantyDetailRow label={FIELD.status} value={status} />
              <WarrantyDetailRow label={FIELD.startDate} value={warranty.dataFillimit} />
              <WarrantyDetailRow label={FIELD.expiration} value={warranty.dataSkadimit} />
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
              <h2 className="text-base font-semibold text-slate-900">{FIELD.coverageDetails}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{warranty.kushtet || STATUS.noTerms}</p>
            </div>
          </div>
        )}
      </div>
  )
}
