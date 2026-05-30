import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'

import ReservationForm from '../components/Reservations/ReservationForm'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import { useToast } from '../components/ui/ToastProvider'

import { fetchReservation, fetchReservations, updateReservation, deleteReservation } from '../api/reservations'

import { fetchCustomers } from '../api/customers'

import { fetchEmployees } from '../api/employees'

import { getKlientId, klientRef, punonjesRef } from '../utils/entityRefs'

import { MESSAGES, ACTIONS, FIELD, NAV, DETAIL, STATUS } from '../constants/labels.sq'



export default function ReservationDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { notify } = useToast()

  const [reservation, setReservation] = useState(null)

  const [customers, setCustomers] = useState([])

  const [employees, setEmployees] = useState([])

  const [history, setHistory] = useState([])

  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)



  useEffect(() => {

    async function load() {

      try {

        setLoading(true)

        const [reservationData, customerData, employeeData, allReservations] = await Promise.all([

          fetchReservation(id),

          fetchCustomers(),

          fetchEmployees(),

          fetchReservations(),

        ])

        setReservation(reservationData)

        setCustomers(customerData || [])

        setEmployees(employeeData || [])

        setHistory(

          (allReservations || [])

            .filter((item) => getKlientId(item.klienti) === getKlientId(reservationData.klienti) && item.rezervimId !== reservationData.rezervimId)

            .sort((a, b) => new Date(`${b.dataRezervimit}T${b.oraRezervimit}`) - new Date(`${a.dataRezervimit}T${a.oraRezervimit}`))

        )

      } catch (err) {

        notify(MESSAGES.loadError, 'error')

      } finally {

        setLoading(false)

      }

    }



    load()

  }, [id])



  const handleSubmit = async (values) => {

    if (!reservation) return

    setSubmitting(true)

    try {

      const payload = {

        klienti: klientRef(values.klienti?.id),

        punonjesi: punonjesRef(values.punonjesi?.punonjesId),

        dataRezervimit: values.dataRezervimit,

        oraRezervimit: values.oraRezervimit,

        statusi: values.statusi,

        shenime: values.shenime || '',

      }

      const updated = await updateReservation(reservation.rezervimId, payload)

      setReservation(updated)

      notify(MESSAGES.saveSuccess)

    } catch (err) {

      notify(MESSAGES.saveError, 'error')

    } finally {

      setSubmitting(false)

    }

  }



  const handleDelete = async () => {

    if (!reservation) return

    const confirmed = window.confirm(ACTIONS.confirmDelete)

    if (!confirmed) return



    try {

      await deleteReservation(reservation.rezervimId)

      notify(MESSAGES.deleteSuccess)

      navigate('/reservations')

    } catch (err) {

      notify(MESSAGES.deleteError, 'error')

    }

  }



  if (loading) {

    return (

      <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>

    )

  }



  if (!reservation) {

    return (

      <div className="p-6 text-slate-700">{DETAIL.notFound}</div>

    )

  }



  const defaultValues = {

    klienti: { id: getKlientId(reservation.klienti) },

    punonjesi: { punonjesId: reservation.punonjesi?.punonjesId },

    dataRezervimit: reservation.dataRezervimit || '',

    oraRezervimit: reservation.oraRezervimit || '',

    statusi: reservation.statusi || 'Ne pritje',

    shenime: reservation.shenime || '',

  }



  return (

    <div className="p-6 space-y-6">

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.rezervimet}</p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Rezervimi #{reservation.rezervimId}</h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">Ndryshoni ose anuloni këtë rezervim.</p>

            </div>

            <button

              onClick={handleDelete}

              className="inline-flex items-center justify-center rounded-3xl border border-red-200 bg-red-50 px-5 py-3 text-sm font-semibold text-red-700 hover:bg-red-100"

            >

              {DETAIL.cancelReservation}

            </button>

          </div>

        </div>



        <div className="grid gap-6 xl:grid-cols-[1fr_360px]">

          <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

            <ReservationForm

              customers={customers}

              employees={employees}

              defaultValues={defaultValues}

              onSubmit={handleSubmit}

              onCancel={() => navigate('/reservations')}

              submitting={submitting}

            />

          </div>



          <div className="space-y-6">

            <div className="rounded-[28px] border border-slate-200 bg-slate-950/90 p-6 text-white shadow-card-md">

              <h2 className="text-lg font-semibold">{FIELD.reservationOverview}</h2>

              <div className="mt-6 space-y-3 text-sm text-slate-300">

                <p><span className="font-semibold text-slate-100">{FIELD.customer}:</span> {reservation.klienti?.emri} {reservation.klienti?.mbiemri}</p>

                <p><span className="font-semibold text-slate-100">{FIELD.employee}:</span> {reservation.punonjesi?.emri} {reservation.punonjesi?.mbiemri}</p>

                <p><span className="font-semibold text-slate-100">{FIELD.date}:</span> {reservation.dataRezervimit}</p>

                <p><span className="font-semibold text-slate-100">{FIELD.time}:</span> {reservation.oraRezervimit}</p>

                <p><span className="font-semibold text-slate-100">{FIELD.status}:</span> {reservation.statusi || 'Ne pritje'}</p>

              </div>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <h2 className="text-lg font-semibold text-slate-900">{FIELD.notes}</h2>

              <p className="mt-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap">{reservation.shenime || MESSAGES.noNotes}</p>

            </div>



            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-card-md">

              <h2 className="text-lg font-semibold text-slate-900">{FIELD.customerHistory}</h2>

              {history.length === 0 ? (

                <p className="mt-4 text-sm text-slate-600">{STATUS.noPreviousReservations}</p>

              ) : (

                <div className="mt-4 space-y-3">

                  {history.map((item) => (

                    <div key={item.rezervimId} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">

                      <p className="font-semibold text-slate-900">#{item.rezervimId} — {item.dataRezervimit} {item.oraRezervimit}</p>

                      <p className="mt-1 text-sm text-slate-600">{FIELD.status}: {item.statusi || 'Ne pritje'}</p>

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


