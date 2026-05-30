import React from 'react'
import { Link } from 'react-router-dom'
import { Edit3, Trash2 } from 'lucide-react'
import Button from '../ui/Button'
import { ACTIONS, FIELDS, MESSAGES, STATUS_LABELS } from '../../constants/labels.sq'

export default function InventoryCardList({ inventory, onEdit, onDelete }) {
  return (
    <div className="grid gap-4 sm:hidden">
      {inventory.map((item) => {
        const lowStock = Number(item.sasiaAktuale ?? 0) <= Number(item.sasiaMinimale ?? 0)
        return (
          <article key={item.inventarId} className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-card-md">
            <div className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">{FIELDS.inventoryItem}</p>
                  <h3 className="mt-3 text-xl font-semibold text-slate-900">{item.produkt?.emriProduktit}</h3>
                  <p className="mt-1 text-sm text-slate-500">{[item.produkt?.marka, item.produkt?.modeli].filter(Boolean).join(' • ') || MESSAGES.noBrandModel}</p>
                </div>
                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${lowStock ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                  {lowStock ? STATUS_LABELS.lowStock : STATUS_LABELS.healthy}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-50 p-4 text-sm">
                  <p className="text-slate-500">{FIELDS.currentStock}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{Number(item.sasiaAktuale ?? 0)}</p>
                </div>
                <div className="rounded-3xl bg-slate-50 p-4 text-sm">
                  <p className="text-slate-500">{FIELDS.minimumStock}</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">{Number(item.sasiaMinimale ?? 0)}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link to={`/inventory/${item.inventarId}`} className="text-sm font-medium text-primary hover:underline">
                  {ACTIONS.details}
                </Link>
                <Button type="button" onClick={() => onEdit(item)} className="bg-slate-900 px-3 py-2 text-xs hover:bg-slate-800">
                  <Edit3 className="h-4 w-4" />
                  {ACTIONS.edit}
                </Button>
                <Button type="button" onClick={() => onDelete(item)} className="bg-red-600 px-3 py-2 text-xs hover:bg-red-700">
                  <Trash2 className="h-4 w-4" />
                  {ACTIONS.delete}
                </Button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
