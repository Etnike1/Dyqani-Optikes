import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../api/products'
import { fetchCategories } from '../api/categories'
import ProductCardList from '../components/Products/ProductCardList'
import ProductFilters from '../components/Products/ProductFilters'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { MESSAGES } from '../constants/labels.sq'

const getCategory = (product) => product.kategori ?? {}
const getCategoryId = (product) => getCategory(product).kategoriId ?? ''
const getCategoryName = (product) => getCategory(product).emriKategorise ?? ''

export default function CatalogPage() {
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
        const [productData, categoryData] = await Promise.all([fetchProducts(), fetchCategories()])
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
    return products.filter((product) => {
      const categoryName = getCategoryName(product)
      const candidate = [
        product.emriProduktit,
        product.marka,
        product.modeli,
        product.ngjyra,
        product.materiali,
        categoryName,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      const searchMatch = !normalizedSearch || candidate.includes(normalizedSearch)
      const productCategoryId = String(getCategoryId(product))
      const categoryMatch = !categoryFilter || productCategoryId === String(categoryFilter)
      return searchMatch && categoryMatch
    })
  }, [products, normalizedSearch, categoryFilter])

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, pageSize),
    [filteredProducts, pageSize]
  )

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
        category={categoryFilter}
        onCategoryChange={setCategoryFilter}
        categories={categories}
        pageSize={pageSize}
        onPageSizeChange={setPageSize}
      />
      <ProductCardList products={visibleProducts} readOnly showOnDesktop />
    </div>
  )
}
