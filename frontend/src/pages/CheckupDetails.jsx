import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import CheckupForm from '../components/Checkups/CheckupForm'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import { useToast } from '../components/ui/ToastProvider'

import { fetchCheckup, fetchCheckups, updateCheckup, deleteCheckup } from '../api/checkups'

import { fetchCustomers } from '../api/customers'

import { fetchEmployees } from '../api/employees'

import { getKlientId, klientRef, punonjesRef } from '../utils/entityRefs'

import { MESSAGES, ACTIONS, FIELD, NAV, STATUS, DETAIL } from '../constants/labels.sq'



export default function CheckupDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { notify } = useToast()

  const [checkup, setCheckup] = useState(null)

  const [customers, setCustomers] = useState([])

  const [employees, setEmployees] = useState([])

  const [history, setHistory] = useState([])

  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)



  useEffect(() => {

    async function load() {

      try {

        setLoading(true)

        const [checkupData, customersData, employeesData, allCheckups] = await Promise.all([

          fetchCheckup(id),

          fetchCustomers(),

          fetchEmployees(),

          fetchCheckups()

        ])

        setCheckup(checkupData)

        setCustomers(customersData || [])

        setEmployees(employeesData || [])

        setHistory((allCheckups || []).filter((item) => getKlientId(item.klient) === getKlientId(checkupData.klient) && item.kontrollId !== checkupData.kontrollId).sort((a, b) => new Date(b.dataKontrollit) - new Date(a.dataKontrollit)))

      } catch (err) {

        notify(MESSAGES.loadError, 'error')

      } finally {

        setLoading(false)

      }

    }

    load()

  }, [id])



  const handleSubmit = async (values) => {

    if (!checkup) return

    setSubmitting(true)

    try {

      const payload = {

        klient: klientRef(values.klient?.id),

        punonjesi: punonjesRef(values.punonjesi?.punonjesId),

        receteId: values.receteId ? Number(values.receteId) : null,

        dataKontrollit: values.dataKontrollit || null,

        rezultati: values.rezultati || '',

        rekomandimi: values.rekomandimi || ''

      }

      const updated = await updateCheckup(checkup.kontrollId, payload)

      setCheckup(updated)

      notify(MESSAGES.saveSuccess)

    } catch (err) {

      notify(MESSAGES.saveError, 'error')

    } finally {

      setSubmitting(false)

    }

  }



  const handleDelete = async () => {

    if (!checkup) return

    const confirmed = window.confirm(ACTIONS.confirmDelete)

    if (!confirmed) return

    try {

      await deleteCheckup(checkup.kontrollId)

      notify(MESSAGES.deleteSuccess)

      navigate('/checkups')

    } catch (err) {

      notify(MESSAGES.deleteError, 'error')

    }

  }



  if (loading) {

    return (

      <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>

    )

  }



  if (!checkup) {

    return (

      <div className="p-6 text-slate-700">{DETAIL.notFound}</div>

    )

  }



  const defaultValues = {

    klient: { id: getKlientId(checkup.klient) },

    punonjesi: { punonjesId: checkup.punonjesi?.punonjesId },

    receteId: checkup.receteId || '',

    dataKontrollit: checkup.dataKontrollit || '',

    rezultati: checkup.rezultati || '',

    rekomandimi: checkup.rekomandimi || ''

  }



  return (

    <div className="p-6 space-y-6">

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.kontrolletSyve}</p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Kontrolli #{checkup.kontrollId}</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Shikoni, ndryshoni ose fshini këtë regjistrim kontrolli.</p>

            </div>

            <button onClick={handleDelete} className="inline-flex items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100">{ACTIONS.delete}</button>

          </div>

        </div>



        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

            <CheckupForm

              customers={customers}

              employees={employees}

              defaultValues={defaultValues}

              onSubmit={handleSubmit}

              onCancel={() => navigate('/checkups')}

              submitting={submitting}

            />

          </div>



          <div className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-slate-950/90 p-6 text-white shadow-card-md">

              <h2 className="text-lg font-semibold">{FIELD.patientOverview}</h2>

              <p className="mt-4 text-sm text-slate-300">{checkup.klient ? `${checkup.klient.emri} ${checkup.klient.mbiemri}` : STATUS.noPatient}</p>

              <p className="mt-3 text-sm text-slate-400">{FIELD.employee}: {checkup.punonjesi ? `${checkup.punonjesi.emri} ${checkup.punonjesi.mbiemri}` : STATUS.noEmployee}</p>

              <p className="mt-3 text-sm text-slate-400">{FIELD.date}: {checkup.dataKontrollit || '-'}</p>

              <p className="mt-3 text-sm text-slate-400">{FIELD.prescription} ID: {checkup.receteId || '-'}</p>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <h2 className="text-lg font-semibold text-slate-900">{FIELD.measurementNotes}</h2>

              <p className="mt-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{checkup.rezultati || STATUS.noDetails}</p>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <h2 className="text-lg font-semibold text-slate-900">{FIELD.recommendations}</h2>

              <p className="mt-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{checkup.rekomandimi || STATUS.noAdditionalNotes}</p>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <h2 className="text-lg font-semibold text-slate-900">{FIELD.patientHistory}</h2>

              {history.length === 0 ? (

                <p className="mt-4 text-sm text-slate-600">{STATUS.noPreviousCheckups}</p>

              ) : (

                <div className="mt-4 space-y-3">

                  {history.map((item) => (

                    <div key={item.kontrollId} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">

                      <p className="font-semibold text-slate-900">#{item.kontrollId} — {item.dataKontrollit}</p>

                      <p className="mt-1 text-sm text-slate-600">{item.rezultati}</p>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

  )

}


