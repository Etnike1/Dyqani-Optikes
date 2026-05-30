import api from './axios'

const PRESC_PATH = '/recetat'

export async function fetchPrescriptions() {
  const res = await api.get(PRESC_PATH)
  return res.data
}

export async function fetchPrescription(id) {
  const res = await api.get(`${PRESC_PATH}/${id}`)
  return res.data
}

export async function createPrescription(payload) {
  const res = await api.post(PRESC_PATH, payload)
  return res.data
}

export async function updatePrescription(id, payload) {
  const res = await api.put(`${PRESC_PATH}/${id}`, payload)
  return res.data
}

export async function deletePrescription(id) {
  await api.delete(`${PRESC_PATH}/${id}`)
}
