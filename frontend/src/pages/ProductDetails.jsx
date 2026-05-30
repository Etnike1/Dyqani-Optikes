import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchProduct } from '../api/products'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { ACTIONS, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

import { formatCurrency } from '../utils/formatCurrency'

export default function ProductDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true)
        const data = await fetchProduct(id)
        setProduct(data)
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadProduct()
  }, [id])

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
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.produktet}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">{product.emriProduktit}</h1>
                <p className="mt-2 text-sm text-slate-500">ID: {product.produktId}</p>
              </div>
              <Button type="button" className="bg-slate-900 hover:bg-slate-800" onClick={() => navigate('/products')}>
                <ArrowLeft className="h-4 w-4" />
                {ACTIONS.back}
              </Button>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.overview}</h2>
                <div className="mt-6 grid gap-4 text-sm text-slate-600">
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.category}</p>
                    <p className="mt-1">{product.kategori?.emriKategorise ?? STATUS.uncategorized}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.price}</p>
                    <p className="mt-1">{formatCurrency(product.cmimi)}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.stock}</p>
                    <p className="mt-1">{Number(product.sasiaStok)} {STATUS.units}</p>
                  </div>
                  <div>
                    <p className="font-medium text-slate-700">{FIELD.status}</p>
                    <p className="mt-1">{product.aktiv ? STATUS.active : STATUS.inactive}</p>
                  </div>
                </div>
              </section>

              <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.specifications}</h2>
                <dl className="mt-6 grid gap-4 text-sm text-slate-600">
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.brand}</dt>
                    <dd className="mt-1">{product.marka || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.model}</dt>
                    <dd className="mt-1">{product.modeli || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.color}</dt>
                    <dd className="mt-1">{product.ngjyra || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.material}</dt>
                    <dd className="mt-1">{product.materiali || '—'}</dd>
                  </div>
                </dl>
              </section>
            </div>
          </div>
        )}
      </div>
  )
}
