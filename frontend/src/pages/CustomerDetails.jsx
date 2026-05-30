import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { fetchCustomer } from '../api/customers'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Button from '../components/ui/Button'
import { ACTIONS, FIELD, MESSAGES } from '../constants/labels.sq'

const formatDate = (value) => {
  if (!value) return '—'
  return new Date(value).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function CustomerDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [customer, setCustomer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadCustomer() {
      try {
        setLoading(true)
        const data = await fetchCustomer(id)
        setCustomer(data)
      } catch (err) {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadCustomer()
  }, [id])

  return (
    <div className="p-6">
        {loading ? (
          <LoadingSpinner label={MESSAGES.loading} />
        ) : error ? (
          <div className="rounded-[28px] border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-card-md">{error}</div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col gap-4 rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-slate-900">{customer.emri} {customer.mbiemri}</h1>
                <p className="mt-2 text-sm text-slate-500">{FIELD.recordId}: {customer.id}</p>
              </div>
              <Button type="button" className="bg-slate-900 hover:bg-slate-800" onClick={() => navigate('/customers')}>
                {ACTIONS.back}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.contactDetails}</h2>
                <dl className="mt-6 grid gap-4 text-sm text-slate-600">
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.email}</dt>
                    <dd className="mt-1">{customer.email || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.phone}</dt>
                    <dd className="mt-1">{customer.telefoni || '—'}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.address}</dt>
                    <dd className="mt-1">{customer.adresa || '—'}</dd>
                  </div>
                </dl>
              </div>

              <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">
                <h2 className="text-lg font-semibold text-slate-900">{FIELD.profileDetails}</h2>
                <dl className="mt-6 grid gap-4 text-sm text-slate-600">
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.birthDate}</dt>
                    <dd className="mt-1">{formatDate(customer.dataLindjes)}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-slate-700">{FIELD.createdOn}</dt>
                    <dd className="mt-1">{formatDate(customer.dataRegjistrimit)}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        )}
      </div>
  )
}
