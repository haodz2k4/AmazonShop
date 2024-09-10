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