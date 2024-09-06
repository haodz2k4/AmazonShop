import {Request, Response} from "express"
import catchAsync from "../utils/catchAync"
import pick from "../utils/pick"
import { getRangePrice } from "../helpers/range.helper"
import * as ProductService from "../services/product.service"
import paginate from "../helpers/paginate.helper"

//[GET] "/api/products"
export const getProducts = catchAsync(async (req: Request, res: Response) => {

    const find = pick(req.query,["status","highlighted","categoryId"]) 
    const rangePriceQuery = pick(req.query,["minPrice","maxPrice"]) 
    const rangePrice = getRangePrice(
        parseInt(rangePriceQuery.minPrice as string) || 0,
        parseInt(rangePriceQuery.maxPrice as string) 
    ) 
    const filter ={...find, ...rangePrice}
    //Pagination 
    const paginateQuery = pick(req.query,["page","limit"])
    const totalDocument = await ProductService.getTotalDocument(filter)
    const pagination = paginate(
        parseInt(paginateQuery.page as string) || 1,
        parseInt(paginateQuery.limit as string) || 30,
        totalDocument
    )
    //Sorting 
    const sort: Record<string, "asc" | "desc"> = {}
    const sortKey = req.query.sortKey as string
    const sortValue = req.query.sortValue as "asc" | "desc"
    if(sortKey && sortValue){
        sort[sortKey] = sortValue
    }
    //select fields 
    const only = req.query.only as string || ""

    const products = await ProductService.getAllProductsByQuery({
        filter,
        pagination,
        sort,
        selectFields: only
    })

    res.status(200).json({products, pagination})

})