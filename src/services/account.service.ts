import { PaginationResult } from "../helpers/paginate.helper"
import Account, {IAccount} from "../models/account.model"
import { ApiError } from "../utils/error"


interface AccountOptions {
    filter: Record<string,any>
    pagination: PaginationResult
    sort: Record<string, "asc" | "desc">
    selectFields: string 
}

export const getAllAccountByQuery = async (options: AccountOptions) => {
    return await Account
    .find({...options.filter,deleted: false})
    .limit(options.pagination.limit)
    .skip(options.pagination.skip)
    .sort(options.sort)
    .select(options.selectFields)
}

export const getAccountById = async (id: string) => {
    return await Account
    .findOne({_id: id}, {deleted: false})
}

export const getTotalDocument = async (query: Partial<IAccount>) => {
    return await Account.countDocuments(query)
}

export const createAccount = async (bodyAccount: IAccount) => {
    return await Account.create(bodyAccount)
}

const getAccountByEmail = async (email: string) => {
    return await Account.findOne({email, deleted: false})
}

export const updateAccountById = async (id: string, bodyAccount: Partial<IAccount>) => {
    const account = await getAccountById(id)
    if(!account){
        throw new ApiError(404,"Account is not found")
    }
    Object.assign(account, bodyAccount)
    await account.save()
    return account
}

export const loginWithEmailAndPassword = async (email: string, password: string) => {
    const account = await getAccountByEmail(email)
    if(!account || !account.isPasswordMatch(password)){
        throw new ApiError(401, "Incorrect email or password")
    }
    return account
}