import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchInventoryItem } from '../api/inventory'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { ACTIONS, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

export default function InventoryDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true)
        const data = await fetchInventoryItem(id)
        setItem(data)
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadItem()
  }, [id])

  const isLowStock = Number(item?.sasiaAktuale ?? 0) <= Number(item?.sasiaMinimale ?? 0)

  return (
    <div className="p-6">
        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : error ? (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-card-md">{error}</div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.inventari}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">{item.produkt?.emriProduktit || MESSAGES.unknown}</h1>
                <p className="mt-2 text-sm text-slate-500">{FIELD.recordId}: {item.inventarId}</p>
              </div>
              <Button type="button" className="bg-slate-900 hover:bg-slate-800" onClick={() => navigate('/inventory')}>
                <ArrowLeft className="h-4 w-4" />
                {ACTIONS.back}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.stockDetails}</h2>
                <div className="mt-6 space-y-4 text-sm text-slate-600">
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.currentStock}</p>
                    <p className="mt-1 text-2xl font-semibold text-slate-900">{Number(item.sasiaAktuale ?? 0)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.minimumThreshold}</p>
                    <p className="mt-1">{Number(item.sasiaMinimale ?? 0)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.updatedOn}</p>
                    <p className="mt-1">{item.dataPerditesimit ? new Date(item.dataPerditesimit).toLocaleDateString('en-GB') : '—'}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.status}</p>
                    <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${isLowStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {isLowStock ? STATUS.lowStock : STATUS.healthyStock}
                    </span>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.productReference}</h2>
                <dl className="mt-6 grid gap-4 text-sm text-slate-600">
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.name}</dt>
                    <dd className="mt-1">{item.produkt?.emriProduktit || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.brand}</dt>
                    <dd className="mt-1">{item.produkt?.marka || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.model}</dt>
                    <dd className="mt-1">{item.produkt?.modeli || '—'}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        )}
      </div>
  )
}
