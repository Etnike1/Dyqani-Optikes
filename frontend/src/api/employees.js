import { createResourceService } from './service'

const employeeService = createResourceService('/punonjesit')

export const fetchEmployees = employeeService.fetchAll
export const fetchEmployee = employeeService.fetchById
export const createEmployee = employeeService.create
export const updateEmployee = employeeService.update
export const deleteEmployee = employeeService.remove
