import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../api/products'
import { fetchCategories } from '../api/categories'
import ProductCardList from '../components/Products/ProductCardList'
import ProductFilters from '../components/Products/ProductFilters'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { MESSAGES } from '../constants/labels.sq'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('')

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
      const candidate = [product.emriProduktit, product.marka, product.modeli, categoryName]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const searchMatch = !normalizedSearch || candidate.includes(normalizedSearch)
      const categoryMatch = !categoryFilter || String(product.kategori?.kategoriId) === String(categoryFilter)
      return searchMatch && categoryMatch
    })
  }, [products, normalizedSearch, categoryFilter])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div className="space-y-6">
      <div>
        <h1 className="page-title">Katalogu</h1>
        <p className="page-subtitle">Produktet e disponueshme në dyqan</p>
      </div>
      <ProductFilters
        search={search}
        onSearchChange={setSearch}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        categories={categories}
      />
      <ProductCardList products={filteredProducts} readOnly />
    </div>
  )
}
