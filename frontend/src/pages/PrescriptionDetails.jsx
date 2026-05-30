import React, { useEffect, useState } from 'react'

import { useParams, useNavigate } from 'react-router-dom'

import LoadingSpinner from '../components/ui/LoadingSpinner'

import { useToast } from '../components/ui/ToastProvider'

import { fetchPrescription, updatePrescription, deletePrescription } from '../api/prescriptions'

import { fetchCustomers } from '../api/customers'

import PrescriptionForm from '../components/Prescriptions/PrescriptionForm'

import { getKlientId, klientRef } from '../utils/entityRefs'

import { MESSAGES, ACTIONS, NAV } from '../constants/labels.sq'



export default function PrescriptionDetails() {

  const { id } = useParams()

  const navigate = useNavigate()

  const { notify } = useToast()

  const [presc, setPresc] = useState(null)

  const [customers, setCustomers] = useState([])

  const [loading, setLoading] = useState(true)

  const [submitting, setSubmitting] = useState(false)



  useEffect(() => {

    async function load() {

      try {

        setLoading(true)

        const [p, custs] = await Promise.all([fetchPrescription(id), fetchCustomers()])

        setPresc(p)

        setCustomers(custs || [])

      } catch (err) {

        notify(MESSAGES.loadError, 'error')

      } finally {

        setLoading(false)

      }

    }

    load()

  }, [id])



  const handleUpdate = async (values) => {

    if (!presc) return

    setSubmitting(true)

    try {

      const payload = {

        klient: klientRef(values.klient?.id),

        mjekuEmri: values.mjekuEmri,

        dataRecetes: values.dataRecetes || null,

        syriDjathteSfera: values.syriDjathteSfera ? Number(values.syriDjathteSfera) : null,

        syriDjathteCilindri: values.syriDjathteCilindri ? Number(values.syriDjathteCilindri) : null,

        syriMajteSfera: values.syriMajteSfera ? Number(values.syriMajteSfera) : null,

        syriMajteCilindri: values.syriMajteCilindri ? Number(values.syriMajteCilindri) : null,

        distancaPupilare: values.distancaPupilare ? Number(values.distancaPupilare) : null,

        shenimet: values.shenimet || ''

      }

      const updated = await updatePrescription(presc.receteId, payload)

      setPresc(updated)

      notify(MESSAGES.saveSuccess)

    } catch (err) {

      notify(MESSAGES.saveError, 'error')

    } finally {

      setSubmitting(false)

    }

  }



  const handleDelete = async () => {

    const confirmed = window.confirm(ACTIONS.confirmDelete)

    if (!confirmed) return

    try {

      await deletePrescription(presc.receteId)

      notify(MESSAGES.deleteSuccess)

      navigate('/prescriptions')

    } catch (err) {

      notify(MESSAGES.deleteError, 'error')

    }

  }



  if (loading) return <div className="p-6"><LoadingSpinner label={MESSAGES.loading} /></div>



  return (

    <div className="p-6 space-y-6">

        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs uppercase tracking-[0.32em] text-slate-400">{NAV.recetat}</p>

              <h1 className="mt-3 text-3xl font-semibold text-slate-900">Receta #{presc?.receteId}</h1>

            </div>

            <div className="flex gap-2">

              <button onClick={handleDelete} className="rounded-3xl border border-red-200 px-4 py-2 text-sm text-red-600">{ACTIONS.delete}</button>

            </div>

          </div>

        </div>



        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-card-md">

          <PrescriptionForm defaultValues={{ klient: { id: getKlientId(presc?.klient) }, mjekuEmri: presc?.mjekuEmri, dataRecetes: presc?.dataRecetes, syriDjathteSfera: presc?.syriDjathteSfera, syriDjathteCilindri: presc?.syriDjathteCilindri, syriMajteSfera: presc?.syriMajteSfera, syriMajteCilindri: presc?.syriMajteCilindri, distancaPupilare: presc?.distancaPupilare, shenimet: presc?.shenimet }} customers={customers} onSubmit={handleUpdate} onCancel={() => navigate('/prescriptions')} submitting={submitting} />

        </div>

      </div>

  )

}


