import { createResourceService } from './service'

const lensService = createResourceService('/lentet')

export const fetchLenses = lensService.fetchAll
export const fetchLens = lensService.fetchById
export const createLens = lensService.create
export const updateLens = lensService.update
export const deleteLens = lensService.remove
