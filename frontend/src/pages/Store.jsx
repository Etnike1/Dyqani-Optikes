import React from 'react'
import { Link } from 'react-router-dom'

export default function StorePage() {
  return (
    <div className="space-y-8">
      <section className="panel overflow-hidden">
        <div className="relative px-6 py-12 sm:px-10">
          <p className="text-sm font-medium uppercase tracking-wider text-primary-400">Mirë se vini</p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">Zgjidhni syzet tuaja ideale</h1>
          <p className="mt-4 max-w-2xl text-[var(--muted)]">
            Shfletoni katalogun tonë, ndiqni porositë dhe menaxhoni rezervimet e kontrollit të syve — të gjitha në
            një vend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/catalog" className="btn-primary">
              Shiko katalogun
            </Link>
            <Link to="/my-orders" className="btn-secondary">
              Porositë e mia
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {[
          { to: '/catalog', title: 'Katalogu', desc: 'Produktet dhe lentet më të fundit' },
          { to: '/my-reservations', title: 'Rezervimet', desc: 'Takimet për kontroll sysh' },
          { to: '/profile', title: 'Profili', desc: 'Të dhënat tuaja personale' },
        ].map((card) => (
          <Link key={card.to} to={card.to} className="panel block p-5 transition hover:border-primary-500/40">
            <h2 className="text-lg font-semibold text-white">{card.title}</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">{card.desc}</p>
          </Link>
        ))}
      </section>
    </div>
  )
}
