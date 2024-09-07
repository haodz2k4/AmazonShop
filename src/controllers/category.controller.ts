import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as CategoryService from "../services/category.service"
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";

//[GET] "/api/categories"
export const getCategories = catchAync(async (req: Request, res: Response) => {

    const filter = pick(req.query,["status","parentCategory"])

    const page = parseInt(req.query.page as string) || 1 
    const limit = parseInt(req.query.limit as string) || 30  
    const totalDocument = await CategoryService.getTotalDocument(filter)
    const pagination = paginateHelper(page, limit,totalDocument) 

    //sort 
    const sort: Record<string,"asc" | "desc"> = {} 
    const sortKey = req.query.sortKey as string 
    const sortValue = req.query.sortKey as "asc" | "desc"
    if(sortKey && sortValue){
        sort[sortKey] = sortValue 
    }
    //select Fields 
    const selectFields = req.query.only as string || ""
    const categories = await CategoryService.getAllCategoryByQuery({filter,pagination, sort,selectFields})
    res.json({categories, pagination})
})

