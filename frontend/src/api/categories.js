import { createResourceService } from './service'

const categoryService = createResourceService('/kategorite')

export const fetchCategories = categoryService.fetchAll
export const fetchCategory = categoryService.fetchById
export const createCategory = categoryService.create
export const updateCategory = categoryService.update
export const deleteCategory = categoryService.remove
