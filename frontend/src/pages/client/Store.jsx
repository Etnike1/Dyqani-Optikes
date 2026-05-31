import React from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import { NAV } from '../../constants/labels.sq'
import { useAuth } from '../../context/AuthContext'

export default function StorePage() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader
        title={`Mirë se vini, ${user?.username || 'Klient'}!`}
        description="Shfletoni katalogun tonë, menaxhoni porositë dhe rezervimet tuaja."
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="/catalog" className="panel block transition hover:border-primary-500/50">
          <h2 className="text-lg font-semibold text-white">{NAV.catalog}</h2>
          <p className="mt-2 text-sm text-slate-400">Shikoni syze, lente kontakti dhe aksesorë.</p>
        </Link>
        <Link to="/my-orders" className="panel block transition hover:border-primary-500/50">
          <h2 className="text-lg font-semibold text-white">{NAV.myOrders}</h2>
          <p className="mt-2 text-sm text-slate-400">Ndiqni statusin e porosive tuaja.</p>
        </Link>
        <Link to="/my-reservations" className="panel block transition hover:border-primary-500/50">
          <h2 className="text-lg font-semibold text-white">{NAV.myReservations}</h2>
          <p className="mt-2 text-sm text-slate-400">Menaxhoni takimet dhe rezervimet.</p>
        </Link>
      </div>
    </div>
  )
}
