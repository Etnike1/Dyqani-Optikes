import { createResourceService } from './service'

const deliveryService = createResourceService('/dergesat')

export const fetchDeliveries = deliveryService.fetchAll
export const fetchDelivery = deliveryService.fetchById
export const createDelivery = deliveryService.create
export const updateDelivery = deliveryService.update
export const deleteDelivery = deliveryService.remove
