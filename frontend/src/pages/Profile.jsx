import React, { useEffect, useState } from 'react'
import { fetchMyProfile, updateCustomer } from '../api/customers'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { ACTIONS, MESSAGES } from '../constants/labels.sq'
import { useToast } from '../components/ui/ToastProvider'

export default function ProfilePage() {
  const { notify } = useToast()
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchMyProfile()
        setProfile(data)
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const handleChange = (field) => (event) => {
    setProfile((current) => ({ ...current, [field]: event.target.value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!profile?.id) return
    try {
      setSaving(true)
      const updated = await updateCustomer(profile.id, profile)
      setProfile(updated)
      notify(MESSAGES.saveSuccess, 'success')
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="page-title">Profili im</h1>
        <p className="page-subtitle">Të dhënat tuaja personale</p>
      </div>
      <form onSubmit={handleSubmit} className="panel space-y-4 p-6">
        <label className="field-label block">
          Emri
          <input className="field-input" value={profile.emri ?? ''} onChange={handleChange('emri')} required />
        </label>
        <label className="field-label block">
          Mbiemri
          <input className="field-input" value={profile.mbiemri ?? ''} onChange={handleChange('mbiemri')} required />
        </label>
        <label className="field-label block">
          Email
          <input className="field-input" type="email" value={profile.email ?? ''} onChange={handleChange('email')} />
        </label>
        <label className="field-label block">
          Telefoni
          <input className="field-input" value={profile.telefoni ?? ''} onChange={handleChange('telefoni')} />
        </label>
        <label className="field-label block">
          Adresa
          <input className="field-input" value={profile.adresa ?? ''} onChange={handleChange('adresa')} />
        </label>
        <button type="submit" className="btn-primary" disabled={saving}>
          {saving ? ACTIONS.saving : ACTIONS.save}
        </button>
      </form>
    </div>
  )
}
