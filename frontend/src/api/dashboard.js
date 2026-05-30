import api from './axios'

export async function fetchDashboardMetrics() {
  const [ordersRes, paymentsRes, productsRes, inventoryRes] = await Promise.all([
    api.get('/porosite'),
    api.get('/pagesat'),
    api.get('/produktet'),
    api.get('/inventari'),
  ])

  return {
    orders: ordersRes.data ?? [],
    payments: paymentsRes.data ?? [],
    products: productsRes.data ?? [],
    inventory: inventoryRes.data ?? [],
  }
}
