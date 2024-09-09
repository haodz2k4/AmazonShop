import { Request, Response } from "express";
import catchAync from "../utils/catchAync"; 
import * as SupplierService from "../services/supplier.service"
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";
import { ApiError } from "../utils/error";
//[GET] "/api/suppliers"
export const getSuppliers = catchAync(async (req: Request, res: Response) => {

    const filter = pick(req.query,["status"])
    //pagination 
    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 15
    const totalDocument = await SupplierService.getTotalDocument(filter);
    const pagination = paginateHelper(page, limit,totalDocument)
    //sort 
    const sort: Record<string, "asc" | "desc"> = {}
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortValue as "asc" | "desc" 
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    const selectFields = req.query.only as string || ""
    const suppliers = await SupplierService.getAllSupplierByQuery({filter, pagination, sort,selectFields})
    res.json({suppliers, pagination})
})

//[GET] "api/suppliers/:id"
export const getSupplier = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params
    const supplier = await SupplierService.getSupplierById(id)
    if(!supplier){
        throw new ApiError(404,"Supplier is not found")
    }
    res.json({supplier})
})