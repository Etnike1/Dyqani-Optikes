import React from 'react'

export default function InventoryWidgets({ totalItems, lowStockCount, healthyStockCount }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-card-lg">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Inventory items</p>
        <p className="mt-4 text-3xl font-semibold">{totalItems}</p>
        <p className="mt-2 text-sm text-slate-300">Total active stock records in the warehouse.</p>
      </div>
      <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-card-lg">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Low stock alerts</p>
        <p className="mt-4 text-3xl font-semibold text-rose-300">{lowStockCount}</p>
        <p className="mt-2 text-sm text-slate-300">Items at or below minimum threshold.</p>
      </div>
      <div className="rounded-[28px] bg-slate-950 p-6 text-white shadow-card-lg">
        <p className="text-sm uppercase tracking-[0.32em] text-slate-400">Healthy stock</p>
        <p className="mt-4 text-3xl font-semibold text-emerald-300">{healthyStockCount}</p>
        <p className="mt-2 text-sm text-slate-300">Items with sufficient inventory levels.</p>
      </div>
    </div>
  )
}
