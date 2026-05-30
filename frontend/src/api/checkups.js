import api from './axios'

const CHECKUPS_PATH = '/kontrolletsyve'

export async function fetchCheckups() {
  const res = await api.get(CHECKUPS_PATH)
  return res.data
}

export async function fetchCheckup(id) {
  const res = await api.get(`${CHECKUPS_PATH}/${id}`)
  return res.data
}

export async function createCheckup(payload) {
  const res = await api.post(CHECKUPS_PATH, payload)
  return res.data
}

export async function updateCheckup(id, payload) {
  const res = await api.put(`${CHECKUPS_PATH}/${id}`, payload)
  return res.data
}

export async function deleteCheckup(id) {
  await api.delete(`${CHECKUPS_PATH}/${id}`)
}
