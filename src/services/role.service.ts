import { PaginationResult } from "../helpers/paginate.helper"
import Role, {IRole} from "../models/role.model"
import Permission from "../models/permission.model"
import { ApiError } from "../utils/error"

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

export const createRole = async (bodyRole: IRole) => {
    return await Role.create(bodyRole)
}

export const getRoleById = async (id: string) => {
    return await Role.findOne({_id: id, deleted: false})
}

export const updateRoleById = async (id: string, bodyRole: Partial<IRole>) => {
    const role = await getRoleById(id)
    if(!role){
        throw new ApiError(404,"Role is not found")
    }
    Object.assign(role,bodyRole)
    await role.save()
    return role 
}

export const getPermissions = async () => {
    const permissons = await Permission.find();
    return permissons
}