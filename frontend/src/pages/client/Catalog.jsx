import React, { useEffect, useMemo, useState } from 'react'
import { fetchProducts } from '../../api/products'
import { formatCurrency } from '../../utils/formatCurrency'
import LoadingSpinner from '../../components/ui/LoadingSpinner'
import PageHeader from '../../components/ui/PageHeader'
import { MESSAGES, NAV, TABLE } from '../../constants/labels.sq'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchProducts()
        // FIX 1: Strictly ensure data is an array. If the backend sends an error object, fallback to []
        setProducts(Array.isArray(data) ? data : [])
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
    if (!normalizedSearch) return products

    // FIX 2: Ensure products is actually an array before filtering
    if (!Array.isArray(products)) return []

    return products.filter((product) => {
      const candidate = [product.emriProduktit, product.marka, product.modeli, product.ngjyra]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return candidate.includes(normalizedSearch)
    })
  }, [products, normalizedSearch])

  if (loading) return <LoadingSpinner />
  if (error) return <p className="text-red-400">{error}</p>

  return (
    <div>
      <PageHeader title={NAV.catalog} description="Produktet e disponueshme në dyqanin tonë optik." />
      <div className="panel mb-6">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Kërko produkte..."
          className="field-input w-full max-w-md"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* FIX 3: Optional chaining before map */}
        {filteredProducts?.map((product) => (
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
      </div>
    </div>
  )
}