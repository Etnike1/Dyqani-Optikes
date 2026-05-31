import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { APP_NAME, ACTIONS, MESSAGES } from '../constants/labels.sq'
import { getHomeRoute } from '../utils/routing'

export default function LoginPage() {
  const { register, handleSubmit } = useForm()
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    setError(null)
    try {
      const user = await login(data)
      navigate(getHomeRoute(user.role), { replace: true })
    } catch {
      setError(MESSAGES.loginError)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="panel w-full max-w-md">
        <h1 className="page-title">{APP_NAME}</h1>
        <p className="page-subtitle mb-6">Hyni në llogarinë tuaj</p>
        {error && <p className="mb-4 rounded-lg bg-red-950/50 px-3 py-2 text-sm text-red-300">{error}</p>}
        <label className="field-label mb-4 block">
          username
          <input {...register('username', { required: true })} className="field-input" autoComplete="username" />
        </label>
        <label className="field-label mb-6 block">
          password
          <input
            {...register('password', { required: true })}
            type="password"
            className="field-input"
            autoComplete="current-password"
          />
        </label>
        <button type="submit" className="btn-primary w-full">
          {ACTIONS.login}
        </button>
        <p className="mt-4 text-center text-sm text-[var(--muted)]">
          Nuk keni llogari?{' '}
          <Link to="/register" className="text-primary-400 hover:underline">
            {ACTIONS.register}
          </Link>
        </p>
      </form>
    </div>
  )
}
