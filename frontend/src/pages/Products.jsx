import React, { useEffect, useMemo, useState } from 'react'
import { createProduct, deleteProduct, fetchProducts, updateProduct } from '../api/products'
import { fetchCategories } from '../api/categories'
import ProductFilters from '../components/Products/ProductFilters'
import ProductTable from '../components/Products/ProductTable'
import ProductCardList from '../components/Products/ProductCardList'
import ProductForm from '../components/Products/ProductForm'
import Modal from '../components/ui/Modal'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import PageHeader from '../components/ui/PageHeader'
import { useToast } from '../components/ui/ToastProvider'
import { ACTIONS, MESSAGES, NAV, PAGE_TITLES, pageLabel } from '../constants/labels.sq'

const PAGE_SIZES = [8, 12, 16, 20]

export default function ProductsPage() {
  const { notify } = useToast()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0])
  const [currentPage, setCurrentPage] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [productData, categoryData] = await Promise.all([fetchProducts(), fetchCategories()])
        setProducts(productData ?? [])
        setCategories(categoryData ?? [])
      } catch {
        setError(MESSAGES.loadError)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const normalizedSearch = search.trim().toLowerCase()
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const categoryName = product.kategori?.emriKategorise ?? ''
      const candidate = [product.emriProduktit, product.marka, product.modeli, product.ngjyra, product.materiali, categoryName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const searchMatch = !normalizedSearch || candidate.includes(normalizedSearch)
      const categoryMatch = !categoryFilter || String(product.kategori?.kategoriId) === String(categoryFilter)
      return searchMatch && categoryMatch
    })
  }, [products, normalizedSearch, categoryFilter])

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / pageSize))
  const pageIndex = Math.min(currentPage, pageCount)
  const visibleProducts = useMemo(
    () => filteredProducts.slice((pageIndex - 1) * pageSize, pageIndex * pageSize),
    [filteredProducts, pageIndex, pageSize]
  )

  const lowStockCount = products.filter((product) => Number(product.sasiaStok) <= 5).length

  const closeModal = () => {
    setEditingProduct(null)
    setIsModalOpen(false)
  }

  const handleSubmit = async (values) => {
    setSubmitting(true)
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.produktId, values)
        setProducts((current) => current.map((item) => (item.produktId === updated.produktId ? updated : item)))
      } else {
        const created = await createProduct(values)
        setProducts((current) => [created, ...current])
      }
      notify(MESSAGES.saveSuccess, 'success')
      closeModal()
    } catch {
      notify(MESSAGES.saveError, 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (product) => {
    if (!window.confirm(ACTIONS.confirmDelete)) return
    try {
      await deleteProduct(product.produktId)
      setProducts((current) => current.filter((item) => item.produktId !== product.produktId))
      notify(MESSAGES.deleteSuccess, 'success')
    } catch {
      notify(MESSAGES.deleteError, 'error')
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow={NAV.produktet}
        title={PAGE_TITLES.products.title}
        description={PAGE_TITLES.products.description}
        onAction={() => { setEditingProduct(null); setIsModalOpen(true) }}
        actionLabel="Produkt i ri"
      >
        <div className="panel-muted text-sm text-[var(--muted)]">
          {products.length} produkte · {filteredProducts.length} të filtruara · {lowStockCount} stok i ulët
        </div>
      </PageHeader>

      <ProductFilters
        search={search}
        onSearchChange={(value) => { setSearch(value); setCurrentPage(1) }}
        category={categoryFilter}
        onCategoryChange={(value) => { setCategoryFilter(value); setCurrentPage(1) }}
        categories={categories}
        pageSize={pageSize}
        onPageSizeChange={(value) => { setPageSize(value); setCurrentPage(1) }}
      />

      {loading ? (
        <LoadingSpinner label={MESSAGES.loading} />
      ) : error ? (
        <div className="panel text-sm text-red-400">{error}</div>
      ) : (
        <>
          <ProductCardList products={visibleProducts} onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true) }} onDelete={handleDelete} />
          <div className="hidden sm:block">
            <ProductTable products={visibleProducts} onEdit={(p) => { setEditingProduct(p); setIsModalOpen(true) }} onDelete={handleDelete} />
          </div>
          <div className="panel flex flex-col items-center justify-between gap-3 text-sm sm:flex-row">
            <span className="text-[var(--muted)]">{filteredProducts.length} produkte</span>
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
        <h2 className="mb-4 text-xl font-semibold">{editingProduct ? 'Ndrysho produktin' : 'Produkt i ri'}</h2>
        <ProductForm
          defaultValues={editingProduct}
          categories={categories}
          onSubmit={handleSubmit}
          onCancel={closeModal}
          isSubmitting={submitting}
        />
      </Modal>
    </div>
  )
}
