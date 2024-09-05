import { PaginationResult } from "../helpers/paginate.helper";
import Product from "../models/product.model"

interface ProductsOption {
    filter: Record<string,any>
    pagination: PaginationResult
    sort: Record<string, "asc" | "desc" | 1 | -1> 
    selectFields: string
}

const Deleted = {deleted: false}

export const getAllProductsByQuery = async (option: ProductsOption) => {

    return await Product
        .find({...option.filter, ...Deleted})
        .sort(option.sort)
        .limit(option.pagination.limit)
        .skip(option.pagination.skip)
        .select(option.selectFields)
}