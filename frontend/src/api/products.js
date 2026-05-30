import api from './axios'

const PRODUCT_PATH = '/produktet'

export async function fetchProducts() {
  const res = await api.get(PRODUCT_PATH)
  return res.data
}

export async function fetchProduct(id) {
  const res = await api.get(`${PRODUCT_PATH}/${id}`)
  return res.data
}

export async function createProduct(payload) {
  const res = await api.post(PRODUCT_PATH, payload)
  return res.data
}

export async function updateProduct(id, payload) {
  const res = await api.put(`${PRODUCT_PATH}/${id}`, payload)
  return res.data
}

export async function deleteProduct(id) {
  await api.delete(`${PRODUCT_PATH}/${id}`)
}
