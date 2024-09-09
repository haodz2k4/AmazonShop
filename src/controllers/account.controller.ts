import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as AccountService from "../services/account.service"
import paginateHelper from "../helpers/paginate.helper";
import pick from "../utils/pick";
//[GET] "/api/accounts"
export const getAccounts = catchAync(async (req: Request, res: Response) => {

    const filter = pick(req.query,["status","roleId"])

    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const totalDocument = await AccountService.getTotalDocument(filter)
    const pagination = paginateHelper(page, limit,totalDocument)

    const sort: Record<string,"asc" | "desc"> ={}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as "asc" | "desc" 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    const selectFields = req.query.only as string || ""
    const accounts = await AccountService.getAllAccountByQuery({filter,pagination, sort, selectFields})
    res.json({accounts, pagination})
})