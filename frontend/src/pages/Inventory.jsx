import React, { useEffect, useMemo, useState } from 'react'
import { fetchInventory, createInventory, updateInventory, deleteInventoryItem } from '../api/inventory'
import { fetchProducts } from '../api/products'
import InventoryFilters from '../components/Inventory/InventoryFilters'
import InventoryWidgets from '../components/Inventory/InventoryWidgets'
import InventoryTable from '../components/Inventory/InventoryTable'
import InventoryCardList from '../components/Inventory/InventoryCardList'
import InventoryForm from '../components/Inventory/InventoryForm'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function InventoryPage() {
  const { notify } = useToast()
  const [inventory, setInventory] = useState([])
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingInventory, setEditingInventory] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [inventoryData, productData] = await Promise.all([fetchInventory(), fetchProducts()])
        setInventory(inventoryData ?? [])
        setProducts(productData ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const normalizedSearch = search.trim().toLowerCase()

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const product = item.produkt || {}
      const candidate = [
        product.emriProduktit,
        product.marka,
        product.modeli,
        String(item.sasiaAktuale),
        String(item.sasiaMinimale),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const searchMatch = !normalizedSearch || candidate.includes(normalizedSearch)
      const lowStock = Number(item.sasiaAktuale ?? 0) <= Number(item.sasiaMinimale ?? 0)
      const statusMatch =
        status === '' || (status === 'low' && lowStock) || (status === 'ok' && !lowStock)

      return searchMatch && statusMatch
    })
  }, [inventory, normalizedSearch, status])

  const pageCount = Math.max(1, Math.ceil(filteredInventory.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleInventory = useMemo(
    () => filteredInventory.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredInventory, pageIndex, pageSize]
  )

  const lowStockItems = inventory.filter((item) => Number(item.sasiaAktuale ?? 0) <= Number(item.sasiaMinimale ?? 0))
  const healthyStock = inventory.length - lowStockItems.length

  const closeModal = () => {
    setEditingInventory(null)
    setIsModalOpen(false)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editingInventory) {
        const updated = await updateInventory(editingInventory.inventarId, values)
        setInventory((current) => current.map((item) => (item.inventarId === updated.inventarId ? updated : item)))
      } else {
        const created = await createInventory(values)
        setInventory((current) => [created, ...current])
      }
      notify(MESSAGES.saveSuccess, 'success')
      closeModal()
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (item) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return

    try {
      await deleteInventoryItem(item.inventarId)
      setInventory((current) => current.filter((record) => record.inventarId !== item.inventarId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.inventari}
        title={PAGE_TITLES.inventory.title}
        description={PAGE_TITLES.inventory.description}
        onAction={() => {
          setEditingInventory(null)
          setIsModalOpen(true)
        }}
        actionLabel={ACTIONS.new}
      />

      <InventoryWidgets totalItems={inventory.length} lowStockCount={lowStockItems.length} healthyStockCount={healthyStock} />

      <InventoryFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
          setCurrentPage(1)
        }}
        status={status}
        onStatusChange={(value) => {
          setStatus(value)
          setCurrentPage(1)
        }}
        pageSize={pageSize}
        onPageSizeChange={(value) => {
          setPageSize(value)
          setCurrentPage(1)
        }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <InventoryCardList inventory={visibleInventory} onEdit={(item) => { setEditingInventory(item); setIsModalOpen(true) }} onDelete={handleDelete} />
          <div className="hidden sm:block">
            <InventoryTable inventory={visibleInventory} onEdit={(item) => { setEditingInventory(item); setIsModalOpen(true) }} onDelete={handleDelete} />
          </div>
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filteredInventory.length} regjistrime</span>
            <div className="flex items-center gap-2">
              <button type="button" className="btn-ghost" disabled={pageIndex === 1} onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}>
                {ACTIONS.previous}
              </button>
              <span>{pageLabel(pageIndex, pageCount)}</span>
              <button type="button" className="btn-ghost" disabled={pageIndex === pageCount} onClick={() => setCurrentPage((page) => Math.min(pageCount, page + 1))}>
                {ACTIONS.next}
              </button>
            </div>
          </div>
        </>
      )}

      <Modal open={isModalOpen} onClose={closeModal}>
        <h2 className="mb-4 text-xl font-semibold">{editingInventory ? 'Ndrysho inventarin' : 'Regjistrim i ri'}</h2>
        <InventoryForm
          defaultValues={editingInventory}
          products={products}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={submitting}
        />
      </Modal>
    </div>
  )
}
