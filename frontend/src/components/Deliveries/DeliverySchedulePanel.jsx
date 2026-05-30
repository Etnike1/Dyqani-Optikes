import React from 'react'
import DeliveryStatusBadge from './DeliveryStatusBadge'

export default function DeliverySchedulePanel({ deliveries = [] }) {
  return (
    <div className="rounded-[28px] border border-slate-200 bg-slate-950/90 p-6 text-white shadow-card-md">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-slate-400">Delivery tracking</p>
          <h2 className="mt-2 text-2xl font-semibold text-white">Recent delivery updates</h2>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {deliveries.length === 0 ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 text-sm text-slate-400">No delivery updates currently available.</div>
        ) : (
          deliveries.map((item) => (
            <div key={item.dergesaId} className="rounded-3xl border border-slate-800 bg-slate-900 p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-white">Order #{item.porosia?.porosiId}</p>
                  <p className="text-sm text-slate-300">{item.porosia?.klient?.emri} {item.porosia?.klient?.mbiemri}</p>
                </div>
                <DeliveryStatusBadge status={item.statusiDergeses} />
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Shipped</p>
                  <p className="mt-1 text-sm text-slate-200">{item.dataNisjes || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Expected</p>
                  <p className="mt-1 text-sm text-slate-200">{item.dataArritjes || 'TBA'}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Carrier</p>
                  <p className="mt-1 text-sm text-slate-200">{item.kompaniaTransportit || 'No carrier'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
