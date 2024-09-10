import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as RoleService from "../services/role.service"
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";

//[GET] "/api/roles"
export const getRoles = catchAync(async (req: Request, res: Response) => {

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 30
    const totalDocument = await RoleService.getTotalDocument();
    const pagination = paginateHelper(page, limit, totalDocument)

    //sort 
    const sort: Record<string,"asc"|"desc"> = {}
    const sortKey = req.query.sortKey as string
    const sortValue = req.query.sortValue as "asc" | "desc"
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    const selectFields = req.query.only as string || ""
    const roles = await RoleService.getRolesByQuery({pagination, sort, selectFields})

    res.json({roles})
})

//[POST] "/api/roles"   
export const createRole = catchAync(async (req: Request, res: Response) => {
    
    const body = req.body 
    const role = await RoleService.createRole(body)

    res.status(201).json({message: "Created role successfully", role})
}) 

//[PATCH] "/api/roles/:id"
export const updateRole = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const body = req.body 
    const role = await RoleService.updateRoleById(id, body)

    res.status(200).json({message: "Update role successfully", role})
})

//[PATCH] "/api/roles/:id/delete"
export const deleteRole = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    await RoleService.updateRoleById(id, {deleted: true})
    res.status(200).json({message: "deleted role successfully"}) 
})