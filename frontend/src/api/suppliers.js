import { createResourceService } from './service'

const supplierService = createResourceService('/furnitoret')

export const fetchSuppliers = supplierService.fetchAll
export const fetchSupplier = supplierService.fetchById
export const createSupplier = supplierService.create
export const updateSupplier = supplierService.update
export const deleteSupplier = supplierService.remove
