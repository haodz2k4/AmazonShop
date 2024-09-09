import { PaginationResult } from "../helpers/paginate.helper"
import Supplier, {ISupplier} from "../models/supplier.model"
import { ApiError } from "../utils/error"

interface SupplierOption {
    filter: Record<string,any>,
    pagination: PaginationResult,
    sort: Record<string, "asc" | "desc">,
    selectFields: string 
}

export const getAllSupplierByQuery = async (options: SupplierOption) => {
    return await Supplier
    .find(options.filter)
    .limit(options.pagination.limit)
    .skip(options.pagination.skip)
    .sort(options.sort)
    .select(options.selectFields)
}

export const getTotalDocument = async (query?: Partial<SupplierOption>) => {
    return await Supplier.countDocuments(query)
}

export const getSupplierById = async (id: string) => {
    return await Supplier.findOne({_id: id}, {deleted: false})
}

export const createSupplier = async (bodySupplier: ISupplier) => {
    return await Supplier.create(bodySupplier)
}

export const updateSupplierById = async (id: string, bodySupplier: Partial<ISupplier>) => {
    const supplier = await getSupplierById(id)
    if(!supplier){
        throw new ApiError(404, "Supplier is not found")
    }
    Object.assign(supplier, bodySupplier)
    await supplier.save()
    return supplier
}