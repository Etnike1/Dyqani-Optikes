import React, { useEffect, useState } from 'react'
import { fetchPrescriptions } from '../../api/prescriptions'
import DataTable from '../../components/ui/DataTable'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import PageHeader from '../../components/ui/PageHeader'
import { MESSAGES, NAV } from '../../constants/labels.sq'

export default function MyPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPrescriptions()
        setPrescriptions(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  const columns = [
    {
      key: 'recetaId',
      title: 'ID',
      render: (row) => row.recetaId,
    },
    {
      key: 'dataRecetes',
      title: 'Data',
      render: (row) => (row.dataRecetes ? new Date(row.dataRecetes).toLocaleDateString('sq-AL') : '—'),
    },
    {
      key: 'pershkrimi',
      title: 'Përshkrimi',
      render: (row) => row.pershkrimi || '—',
    },
  ]

  return (
    <div>
      <PageHeader title={NAV.myPrescriptions} description="Recetat tuaja optike." />
      <DataTable columns={columns} data={prescriptions} />
    </div>
  )
}
