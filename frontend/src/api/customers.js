import { createResourceService } from './service'

const customerService = createResourceService('/klientet')

export const fetchCustomers = customerService.fetchAll
export const fetchCustomer = customerService.fetchById
export const createCustomer = customerService.create
export const updateCustomer = customerService.update
export const deleteCustomer = customerService.remove
