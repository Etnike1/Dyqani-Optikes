import { createResourceService } from './service'

const inventoryService = createResourceService('/inventari')

export const fetchInventory = inventoryService.fetchAll
export const fetchInventoryItem = inventoryService.fetchById
export const createInventory = inventoryService.create
export const updateInventory = inventoryService.update
export const deleteInventoryItem = inventoryService.remove
