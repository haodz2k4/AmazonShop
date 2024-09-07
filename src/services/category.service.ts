import { PaginationResult } from "../helpers/paginate.helper"
import Category, { ICategory } from "../models/category.model"

interface CategoriesOption {
    filter: Record<string,any>
    pagination: PaginationResult
    sort: Record<keyof ICategory, "asc" | "desc" | 1 | -1> 
    selectFields: string 
}

export const getAllCategoryByQuery = async (options: CategoriesOption) => {
    return await Category
        .find({...options.filter,deleted: false})
        .limit(options.pagination.limit)
        .skip(options.pagination.skip)
        .sort(options.sort)
        .select(options.selectFields)

}

export const getTotalDocument = async (query?: Record<string,any>) => {
    return await Category.countDocuments(query);
}

export const getCategoryById = async (id: string) => {
    return await Category.findOne({_id: id, deleted: false})
}

export const getCategoryBySlug = async (slug: string) => {
    return await Category.findOne({slug, deleted: false})
}

