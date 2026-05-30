import api from './axios'

const RESERVATIONS_PATH = '/rezervimet'

export async function fetchReservations() {
  const res = await api.get(RESERVATIONS_PATH)
  return res.data
}

export async function fetchReservation(id) {
  const res = await api.get(`${RESERVATIONS_PATH}/${id}`)
  return res.data
}

export async function createReservation(payload) {
  const res = await api.post(RESERVATIONS_PATH, payload)
  return res.data
}

export async function updateReservation(id, payload) {
  const res = await api.put(`${RESERVATIONS_PATH}/${id}`, payload)
  return res.data
}

export async function deleteReservation(id) {
  await api.delete(`${RESERVATIONS_PATH}/${id}`)
}
