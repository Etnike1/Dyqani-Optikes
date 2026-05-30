import { createResourceService } from './service'

const visitHistoryService = createResourceService('/historiku-vizitave')

export const fetchVisitHistory = visitHistoryService.fetchAll
export const fetchVisitHistoryById = visitHistoryService.fetchById
export const createVisitHistory = visitHistoryService.create
export const updateVisitHistory = visitHistoryService.update
export const deleteVisitHistory = visitHistoryService.remove
