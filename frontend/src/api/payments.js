import { createResourceService, apiGet } from './service'

const paymentService = createResourceService('/pagesat')

export const fetchPayments = paymentService.fetchAll
export const fetchPaymentsByOrder = (orderId) => apiGet(`/pagesat/porosia/${orderId}`)
export const fetchPayment = paymentService.fetchById
export const createPayment = paymentService.create
export const updatePayment = paymentService.update
export const deletePayment = paymentService.remove
