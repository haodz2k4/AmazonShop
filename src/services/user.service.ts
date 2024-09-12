import { PaginationResult } from "../helpers/paginate.helper"
import User, {IUser} from "../models/user.model"
import { ApiError } from "../utils/error"

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

const getUserByEmail = async (email: string) => {
    return User.findOne({email})
}

export const getUserById = async (id: string) => {
    return await User.findOne({_id: id, deleted: false})
}

export const createUser = async (bodyUser: IUser) => {
    return await User.create(bodyUser)
}

export const updateUserById = async (id: string, bodyUser: Partial<IUser>) => {
    const user = await getUserById(id)
    if(!user){
        throw new ApiError(404,"User is not found")
    }
    Object.assign(user,bodyUser)
    await user.save()
    return user 

}

export const loginUser = async (email: string, password: string) => {
    const user = await getUserByEmail(email)
    if(!user || !user.isPasswordMatch(password)){
        throw new ApiError(401,"Incorrect email or password")
    }
    return user 
}