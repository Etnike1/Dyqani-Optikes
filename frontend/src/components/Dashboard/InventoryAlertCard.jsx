import React from 'react'

import { DASHBOARD } from '../../constants/labels.sq'



export default function InventoryAlertCard({ alerts = [] }) {

  return (

    <div className="panel">

      <div className="flex items-center justify-between gap-4">

        <div>

          <h2 className="text-base font-semibold text-[var(--text)]">{DASHBOARD.inventoryAlerts}</h2>

          <p className="text-sm text-[var(--muted)]">{DASHBOARD.stockThreshold}</p>

        </div>

        <span className="rounded-full bg-red-900/40 px-3 py-1 text-xs font-semibold text-red-300">

          {DASHBOARD.alertsCount(alerts.length)}

        </span>

      </div>

      <div className="mt-4 space-y-3">

        {alerts.length === 0 ? (

          <p className="panel-muted text-sm text-[var(--muted)]">{DASHBOARD.noStockAlerts}</p>

        ) : (

          alerts.slice(0, 5).map((item) => (

            <div key={item.inventarId} className="panel-muted">

              <p className="text-sm font-medium text-[var(--text)]">

                {item.produkt?.emriProduktit ?? item.emriProduktit ?? '—'}

              </p>

              <p className="mt-1 text-sm text-[var(--muted)]">

                {DASHBOARD.currentQty}: {item.sasiaAktuale ?? 0} · {DASHBOARD.minQty}: {item.sasiaMinimale ?? 0}

              </p>

            </div>

          ))

        )}

      </div>

    </div>

  )

}

