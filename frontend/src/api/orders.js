import api from './axios'

const ORDER_PATH = '/porosite'
const ORDER_DETAIL_PATH = '/detajet-porosise'
const RECIPE_PATH = '/recetat'
const EMPLOYEES_PATH = '/punonjesit/aktiv'
const CUSTOMER_PATH = '/klientet'
const PRODUCT_PATH = '/produktet'

export async function fetchOrders() {
  const res = await api.get(ORDER_PATH)
  return res.data
}

export async function fetchOrder(id) {
  const res = await api.get(`${ORDER_PATH}/${id}`)
  return res.data
}

export async function createOrder(payload) {
  const res = await api.post(ORDER_PATH, payload)
  return res.data
}

export async function updateOrder(id, payload) {
  const res = await api.put(`${ORDER_PATH}/${id}`, payload)
  return res.data
}

export async function deleteOrder(id) {
  await api.delete(`${ORDER_PATH}/${id}`)
}

export async function fetchOrderDetails(orderId) {
  const res = await api.get(`${ORDER_DETAIL_PATH}/porosia/${orderId}`)
  return res.data
}

export async function createOrderDetail(payload) {
  const res = await api.post(ORDER_DETAIL_PATH, payload)
  return res.data
}

export async function updateOrderDetail(id, payload) {
  const res = await api.put(`${ORDER_DETAIL_PATH}/${id}`, payload)
  return res.data
}

export async function deleteOrderDetail(id) {
  await api.delete(`${ORDER_DETAIL_PATH}/${id}`)
}

export async function fetchOrderCustomers() {
  const res = await api.get(CUSTOMER_PATH)
  return res.data
}

export async function fetchOrderProducts() {
  const res = await api.get(PRODUCT_PATH)
  return res.data
}

export async function fetchOrderPrescriptions() {
  const res = await api.get(RECIPE_PATH)
  return res.data
}

export async function fetchOrderEmployees() {
  const res = await api.get(EMPLOYEES_PATH)
  return res.data
}
