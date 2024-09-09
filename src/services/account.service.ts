import { PaginationResult } from "../helpers/paginate.helper"
import Account, {IAccount} from "../models/account.model"


interface AccountOptions {
    filter: Record<string,any>
    pagination: PaginationResult
    sort: Record<string, "asc" | "desc">
    selectFields: string 
}

export const getAllAccountByQuery = async (options: AccountOptions) => {
    return await Account
    .find(options.filter)
    .limit(options.pagination.limit)
    .skip(options.pagination.skip)
    .sort(options.sort)
    .select(options.selectFields)
}

export const getTotalDocument = async (query: Partial<IAccount>) => {
    return await Account.countDocuments(query)
}