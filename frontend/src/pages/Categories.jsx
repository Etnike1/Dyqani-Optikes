import React, { useEffect, useMemo, useState } from 'react'
import { createCategory, deleteCategory, fetchCategories, updateCategory } from '../api/categories'
import CategoryFilters from '../components/Categories/CategoryFilters'
import CategoryTable from '../components/Categories/CategoryTable'
import CategoryForm from '../components/Categories/CategoryForm'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function CategoriesPage() {
  const { notify } = useToast()
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadCategories() {
      try {
        setLoading(true)
        const data = await fetchCategories()
        setCategories(data ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredCategories = useMemo(() => {
    if (!normalizedSearch) return categories
    return categories.filter((category) => {
      return (
        category.emriKategorise?.toLowerCase().includes(normalizedSearch) ||
        category.pershkrimi?.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [categories, normalizedSearch])

  const pageCount = Math.max(1, Math.ceil(filteredCategories.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleCategories = useMemo(
    () => filteredCategories.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredCategories, pageIndex, pageSize]
  )

  const closeModal = () => {
    setEditingCategory(null)
    setIsModalOpen(false)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editingCategory) {
        const updated = await updateCategory(editingCategory.kategoriId, values)
        setCategories((current) => current.map((item) => (item.kategoriId === updated.kategoriId ? updated : item)))
      } else {
        const created = await createCategory(values)
        setCategories((current) => [created, ...current])
      }
      notify(MESSAGES.saveSuccess, 'success')
      closeModal()
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (category) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteCategory(category.kategoriId)
      setCategories((current) => current.filter((item) => item.kategoriId !== category.kategoriId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.kategorite}
        title={PAGE_TITLES.categories.title}
        description={PAGE_TITLES.categories.description}
        onAction={() => {
          setEditingCategory(null)
          setIsModalOpen(true)
        }}
        actionLabel={ACTIONS.new}
      />

      <CategoryFilters
        search={search}
        onSearchChange={(value) => {
          setSearch(value)
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
          <CategoryTable categories={visibleCategories} onEdit={(category) => { setEditingCategory(category); setIsModalOpen(true) }} onDelete={handleDelete} />
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filteredCategories.length} kategori</span>
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
        <h2 className="mb-4 text-xl font-semibold">{editingCategory ? 'Ndrysho kategorinë' : 'Kategori e re'}</h2>
        <CategoryForm
          defaultValues={editingCategory}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={submitting}
        />
      </Modal>
    </div>
  )
}
