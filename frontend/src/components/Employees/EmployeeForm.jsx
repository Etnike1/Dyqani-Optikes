import React from 'react'
import { useForm } from 'react-hook-form'

const ROLE_OPTIONS = [
  { value: '', label: 'Select a role' },
  { value: 'ROLE_ADMIN', label: 'Admin' },
  { value: 'ROLE_EMPLOYEE', label: 'Employee' },
  { value: 'ROLE_USER', label: 'User' }
]

export default function EmployeeForm({ defaultValues = {}, onSubmit, onCancel, submitting }) {
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: { aktiv: true, ...defaultValues } })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700">First name</label>
          <input {...register('emri', { required: 'First name is required' })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          {errors.emri && <p className="text-xs text-red-600">{errors.emri.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-700">Last name</label>
          <input {...register('mbiemri', { required: 'Last name is required' })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          {errors.mbiemri && <p className="text-xs text-red-600">{errors.mbiemri.message}</p>}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700">Email</label>
          <input type="email" {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' } })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
          {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm text-slate-700">Phone</label>
          <input {...register('telefoni')} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm text-slate-700">Role</label>
          <select {...register('roli', { required: 'Role is required' })} className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm">
            {ROLE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          {errors.roli && <p className="text-xs text-red-600">{errors.roli.message}</p>}
        </div>
        <div className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-4 py-4">
          <label htmlFor="aktiv" className="text-sm text-slate-700">Active employee</label>
          <input type="checkbox" id="aktiv" {...register('aktiv')} className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary" />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button type="submit" disabled={submitting} className="rounded-3xl bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-teal-600">
          {submitting ? 'Saving...' : 'Save employee'}
        </button>
        <button type="button" onClick={onCancel} className="rounded-3xl border border-slate-200 bg-white px-5 py-3 text-sm">
          Cancel
        </button>
      </div>
    </form>
  )
}
