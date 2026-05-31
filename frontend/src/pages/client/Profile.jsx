import React from 'react'
import PageHeader from '../../components/ui/PageHeader'
import { NAV } from '../../constants/labels.sq'
import { ROLE_LABELS } from '../../constants/roles'
import { useAuth } from '../../context/AuthContext'

export default function ProfilePage() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader title={NAV.profile} description="Informacioni i llogarisë suaj." />
      <div className="panel max-w-lg space-y-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Emri i përdoruesit</p>
          <p className="mt-1 text-lg text-white">{user?.username}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-500">Roli</p>
          <p className="mt-1 text-lg text-white">{ROLE_LABELS[user?.role] || user?.role}</p>
        </div>
        {user?.userId && (
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">ID</p>
            <p className="mt-1 text-lg text-white">{user.userId}</p>
          </div>
        )}
      </div>
    </div>
  )
}
