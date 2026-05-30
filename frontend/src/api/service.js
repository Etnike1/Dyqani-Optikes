import api from './axios'

const parseError = (error) => {
  if (!error?.response) return { message: 'Gabim rrjeti. Provoni përsëri.' }
  const { status, data } = error.response
  return {
    status,
    message: data?.message || data?.error || `Kërkesa dështoi (${status})`,
  }
}

const extractData = (response) => response.data

const handle = async (request) => {
  try {
    const response = await request
    return extractData(response)
  } catch (error) {
    const parsed = parseError(error)
    throw Object.assign(new Error(parsed.message), { status: parsed.status })
  }
}

export const createResourceService = (path) => ({
  fetchAll: () => handle(api.get(path)),
  fetchById: (id) => handle(api.get(`${path}/${id}`)),
  create: (payload) => handle(api.post(path, payload)),
  update: (id, payload) => handle(api.put(`${path}/${id}`, payload)),
  remove: (id) => handle(api.delete(`${path}/${id}`)),
})

export const apiGet = (path) => handle(api.get(path))
export const apiPost = (path, payload) => handle(api.post(path, payload))
export const apiPut = (path, payload) => handle(api.put(path, payload))
export const apiDelete = (path) => handle(api.delete(path))
