import { PaginationResult } from "../helpers/paginate.helper"
import User from "../models/user.model"

interface UserOptions {
    filter: Record<string, any>,
    pagination: PaginationResult,
    sort: Record<string, "asc" | "desc">,
    selectFields: string 
}

export const getUsersByQuery = async (options: UserOptions) => {
    return await User
    .find({...options.filter, deleted: false})
    .limit(options.pagination.limit)
    .skip(options.pagination.skip)
    .sort(options.sort)
    .select(options.selectFields)
}

export const getTotalDocument = async (query?: Record<string, any>) => {
    return await User.countDocuments(query)
}