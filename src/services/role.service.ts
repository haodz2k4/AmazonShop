import { PaginationResult } from "../helpers/paginate.helper"
import Role, {IRole} from "../models/role.model"

interface RoleOptions {
    pagination: PaginationResult,
    sort: Record<keyof IRole, "asc" | "desc">,
    selectFields: string 
}

export const getRolesByQuery = async (options: RoleOptions) => {
    
    return await Role
        .find({deleted: false})
        .limit(options.pagination.limit)
        .skip(options.pagination.skip)
        .sort(options.sort)
        .select(options.selectFields)
}

export const getTotalDocument = async (query?: Record<string, any>) => {
    return await Role.countDocuments(query)
}