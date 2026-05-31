import React from 'react'
import { formatCurrency } from '../../utils/formatCurrency'
import { Link } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import { ACTIONS, MESSAGES, STATUS_LABELS, TABLE } from '../../constants/labels.sq'

export default function ProductCardList({ products, onEdit, onDelete, readOnly = false, showOnDesktop = false }) {
  return (
    <div className={showOnDesktop ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3' : 'grid gap-4 sm:hidden'}>
      {products.map((product) => (
        <article key={product.produktId} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card-md">
          <div className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{product.kategori?.emriKategorise || TABLE.category}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{product.emriProduktit}</h3>
                <p className="mt-1 text-sm text-slate-500">{[product.marka, product.modeli].filter(Boolean).join(' • ') || MESSAGES.noBrandModel}</p>
              </div>
              <div className="flex items-center gap-2 text-right">
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${product.aktiv ? 'bg-slate-100 text-slate-700' : 'bg-slate-900/5 text-slate-600'}`}>
                  {product.aktiv ? STATUS_LABELS.active : STATUS_LABELS.inactive}
                </span>
              </div>
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-3xl bg-slate-50 p-4 text-sm">
                <p className="font-medium text-slate-700">{TABLE.stock}</p>
                <p className={`mt-2 text-lg font-semibold ${Number(product.sasiaStok) <= 5 ? 'text-rose-600' : 'text-emerald-700'}`}>{Number(product.sasiaStok)}</p>
              </div>
              <div className="rounded-3xl bg-slate-50 p-4 text-sm">
                <p className="font-medium text-slate-700">{TABLE.price}</p>
                <p className="mt-2 text-lg font-semibold text-slate-900">{formatCurrency(product.cmimi ?? 0)}</p>
              </div>
            </div>

            {!readOnly && (
              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/products/${product.produktId}`} className="text-sm font-medium text-primary hover:underline">
                  {ACTIONS.viewDetails}
                </Link>
                <Button type="button" onClick={() => onEdit(product)} className="bg-slate-900 px-3 py-2 text-xs hover:bg-slate-800">
                  <Edit3 className="h-4 w-4" />
                  {ACTIONS.edit}
                </Button>
                <Button type="button" onClick={() => onDelete(product)} className="bg-red-600 px-3 py-2 text-xs hover:bg-red-700">
                  <Trash2 className="h-4 w-4" />
                  {ACTIONS.delete}
                </Button>
              </div>
            )}
            {readOnly && (
              <div className="mt-5">
                <p className="text-lg font-semibold text-slate-900">{formatCurrency(product.cmimi ?? 0)}</p>
              </div>
            )}
          </div>
        </article>
      ))}
    </div>
  )
}
