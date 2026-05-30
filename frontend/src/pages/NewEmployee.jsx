import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import EmployeeForm from '../components/Employees/EmployeeForm'
import { useToast } from '../components/ui/ToastProvider'
import { createEmployee } from '../api/employees'
import { MESSAGES, NAV } from '../constants/labels.sq'

export default function NewEmployee() {
  const navigate = useNavigate()
  const { notify } = useToast()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (values) => {
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
      const created = await createEmployee(payload)
      notify(MESSAGES.saveSuccess)
      navigate(`/employees/${created.punonjesId}`)
    } catch (err) {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 space-y-6">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.punonjesit}</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Punonjës i ri</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Krijoni profilin e punonjësit dhe caktoni rolin.</p>
          </div>
        </div>

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">
          <EmployeeForm onSubmit={handleSubmit} onCancel={() => navigate('/employees')} submitting={submitting} />
        </div>
      </div>
  )
}
