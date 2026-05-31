import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import * as authApi from '../api/auth'
import { APP_NAME, ACTIONS, MESSAGES } from '../constants/labels.sq'

export default function RegisterPage() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    setError(null)
    try {
      await authApi.register(data)
      navigate('/login')
    } catch (err) {
      const resp = err?.response?.data
      if (resp && resp.errors) {
        const msgs = Object.values(resp.errors).join(' · ')
        setError(msgs)
      } else if (resp && resp.message) {
        setError(resp.message)
      } else {
        console.error(err)
        setError('Regjistrimi dështoi.')
      }
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="panel w-full max-w-md">
        <h1 className="page-title">{APP_NAME}</h1>
        <p className="page-subtitle mb-6">Krijoni llogari të re</p>
        {error && <p className="mb-4 rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">{error}</p>}
        <label className="field-label mb-4 block">
          username
          <input {...register('username', { required: true })} className="field-input" />
        </label>
        <label className="field-label mb-4 block">
          mbiemri
          <input {...register('mbiemri')} className="field-input" />
        </label>
        <label className="field-label mb-4 block">
          email
          <input type="email" {...register('email', { required: true })} className="field-input" />
        </label>
        <label className="field-label mb-6 block">
          password
          <input type="password" {...register('password', { required: true })} className="field-input" />
        </label>
        <button type="submit" className="btn-primary w-full">
          {ACTIONS.register}
        </button>
        <p className="mt-4 text-center text-sm text-[var(--muted)]">
          Keni llogari?{' '}
          <Link to="/login" className="text-primary-400 hover:underline">
            {ACTIONS.login}
          </Link>
        </p>
      </form>
    </div>
  )
}
