import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as CategoryService from "../services/category.service"
import pick from "../utils/pick";
import paginateHelper from "../helpers/paginate.helper";
import { ApiError } from "../utils/error";

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

//[GET] "/api/categories/:id"
export const getCategory = catchAync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const category = await CategoryService.getCategoryById(id);
    if(!category){
        throw new ApiError(404,"Category is not found")
    }
    res.json({category})
})

//[GET] "/api/categories/:slug"
export const getCategoryBySlug = catchAync(async (req: Request, res: Response) => {
    const {slug} = req.params 
    const category = await CategoryService.getCategoryBySlug(slug);
    if(!category){
        throw new ApiError(404,"Category is not found")
    }
    res.json({category})
})
