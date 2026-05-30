import api from './axios'

const WARRANTY_PATH = '/garancite'

export async function fetchWarranties() {
  const res = await api.get(WARRANTY_PATH)
  return res.data
}

export async function fetchWarranty(id) {
  const res = await api.get(`${WARRANTY_PATH}/${id}`)
  return res.data
}

export async function createWarranty(payload) {
  const res = await api.post(WARRANTY_PATH, payload)
  return res.data
}

export async function updateWarranty(id, payload) {
  const res = await api.put(`${WARRANTY_PATH}/${id}`, payload)
  return res.data
}

export async function deleteWarranty(id) {
  await api.delete(`${WARRANTY_PATH}/${id}`)
}
