import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../../../api/products'
import { fetchCategories } from '../../../api/categories'
import { formatCurrency } from '../../../utils/formatCurrency'
import LoadingSpinner from '../../../components/ui/LoadingSpinner'
import PageHeader from '../../../components/ui/PageHeader'
import ProductFilters from '../../../components/Products/ProductFilters'
import { MESSAGES, NAV, TABLE } from '../../../constants/labels.sq'

export default function Catalog() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')
  const [pageSize, setPageSize] = useState(8)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [productData, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ])

        setProducts(Array.isArray(productData) ? productData : [])
        setCategories(Array.isArray(categoryData) ? categoryData : [])
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
    if (!Array.isArray(products)) return []

    return products.filter((product) => {
      const categoryName = product.kategori?.emriKategorise ?? ''
      const searchableValue = [
        product.emriProduktit,
        product.marka,
        product.modeli,
        product.ngjyra,
        categoryName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()

      const matchesSearch = !normalizedSearch || searchableValue.includes(normalizedSearch)
      const matchesCategory = !categoryFilter || String(product.kategori?.kategoriId) === String(categoryFilter)

      return matchesSearch && matchesCategory
    })
  }, [products, normalizedSearch, categoryFilter])

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, pageSize),
    [filteredProducts, pageSize]
  )

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div>
      <PageHeader title={NAV.catalog} description="Produktet e disponueshme në dyqanin tonë optik." />
       <h1 className="text-4xl text-red-500 font-bold text-center my-4">KODI I SAKTË PO FUNKSIONON!</h1>
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-6">
        {visibleProducts.map((product) => (
          <article key={product.produktId} className="panel">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              {product.kategori?.emriKategorise || TABLE.category}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-white">{product.emriProduktit}</h3>
            <p className="mt-1 text-sm text-slate-400">
              {[product.marka, product.modeli].filter(Boolean).join(' • ')}
            </p>
            <p className="mt-4 text-xl font-semibold text-primary-400">
              {formatCurrency(product.cmimi ?? 0)}
            </p>
          </article>
        ))}

        {visibleProducts.length === 0 && (
          <p className="text-slate-400 col-span-full text-center py-8">
            Nuk u gjet asnjë produkt që përputhet me kërkimin tuaj.
          </p>
        )}
      </div>
    </div>
  )
}
