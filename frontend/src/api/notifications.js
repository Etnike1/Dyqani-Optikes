import api from './axios'

const NOTIFICATIONS_PATH = '/njoftimet'

export async function fetchNotifications() {
  const res = await api.get(NOTIFICATIONS_PATH)
  return res.data
}

export async function fetchNotification(id) {
  const res = await api.get(`${NOTIFICATIONS_PATH}/${id}`)
  return res.data
}

export async function createNotification(payload) {
  const res = await api.post(NOTIFICATIONS_PATH, payload)
  return res.data
}

export async function updateNotification(id, payload) {
  const res = await api.put(`${NOTIFICATIONS_PATH}/${id}`, payload)
  return res.data
}

export async function deleteNotification(id) {
  await api.delete(`${NOTIFICATIONS_PATH}/${id}`)
}
