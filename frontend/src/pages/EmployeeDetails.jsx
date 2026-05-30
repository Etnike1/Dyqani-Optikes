import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useToast } from '../components/ui/ToastProvider'
import { fetchEmployee, updateEmployee, deleteEmployee } from '../api/employees'
import EmployeeForm from '../components/Employees/EmployeeForm'
import EmployeeRoleBadge from '../components/Employees/EmployeeRoleBadge'
import { ACTIONS, DETAIL, FIELD, MESSAGES, NAV, STATUS } from '../constants/labels.sq'

export default function EmployeeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { notify } = useToast()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await fetchEmployee(id)
        setEmployee(data)
        setError(null)
      } catch (err) {
        setError(MESSAGES.loadError)
        notify(MESSAGES.loadError, 'error')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleUpdate = async (values) => {
    if (!employee) return
    setSubmitting(true)
    try {
      const payload = {
        emri: values.emri,
        mbiemri: values.mbiemri,
        roli: values.roli,
        email: values.email,
        telefoni: values.telefoni || null,
        aktiv: Boolean(values.aktiv)
      }
      const updated = await updateEmployee(employee.punonjesId, payload)
      setEmployee(updated)
      notify(MESSAGES.saveSuccess)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async () => {
    if (!employee) return
    const confirmed = window.confirm(ACTIONS.confirmDelete)
    if (!confirmed) return

    try {
      await deleteEmployee(employee.punonjesId)
      notify(MESSAGES.deleteSuccess)
      navigate('/employees')
    } catch (err) {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  if (loading) {
    return (
      <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>
    )
  }

  if (error || !employee) {
    return (
      <div className="p-6">
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700">
            {error || DETAIL.notFound}
          </div>
        </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-white shadow-md">
                {`${employee.emri?.[0] ?? ''}${employee.mbiemri?.[0] ?? ''}`.toUpperCase()}
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.punonjesit}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900">{employee.emri} {employee.mbiemri}</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <EmployeeRoleBadge role={employee.roli} />
                  <span className={`rounded-full px-3 py-1 text-sm ${employee.aktiv ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                    {employee.aktiv ? STATUS.active : STATUS.inactive}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <button onClick={handleDelete} className="rounded-3xl border border-red-200 px-4 py-2 text-sm text-red-600">{ACTIONS.delete}</button>
              <button onClick={() => navigate('/employees')} className="rounded-3xl border border-slate-200 bg-white px-4 py-2 text-sm">{ACTIONS.back}</button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
            <div className="space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.contact}</p>
                <p className="mt-2 text-sm text-slate-700">{employee.email || MESSAGES.noEmail}</p>
                <p className="mt-1 text-sm text-slate-700">{employee.telefoni || '—'}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{FIELD.employeeId}</p>
                <p className="mt-2 text-sm text-slate-700">{employee.punonjesId}</p>
              </div>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
            <h2 className="text-lg font-semibold text-slate-900">{FIELD.editProfile}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">Përditësoni të dhënat, rolin dhe statusin aktiv.</p>
            <div className="mt-6">
              <EmployeeForm
                defaultValues={{
                  emri: employee.emri,
                  mbiemri: employee.mbiemri,
                  email: employee.email || '',
                  telefoni: employee.telefoni || '',
                  roli: employee.roli || '',
                  aktiv: employee.aktiv
                }}
                onSubmit={handleUpdate}
                onCancel={() => navigate('/employees')}
                submitting={submitting}
              />
            </div>
          </div>
        </div>
      </div>
  )
}
