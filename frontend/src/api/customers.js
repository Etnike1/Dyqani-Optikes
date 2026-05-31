import { createResourceService, apiGet } from './service'

const customerService = createResourceService('/klientet')

export const fetchCustomers = customerService.fetchAll
export const fetchCustomer = customerService.fetchById
export const fetchMyProfile = () => apiGet('/klientet/me')
export const createCustomer = customerService.create
export const updateCustomer = customerService.update
export const deleteCustomer = customerService.remove
