import {NextFunction, Request, Response} from "express"
import catchAsync from "../utils/catchAync"
import pick from "../utils/pick"
import { getRangePrice } from "../helpers/range.helper"
import * as ProductService from "../services/product.service"
import { getCategoryBySlug } from "../services/category.service"
import paginate from "../helpers/paginate.helper"
import { buildRegExp } from "../utils/regExp"
import { ApiError } from "../utils/error"

//[GET] "/api/products"
export const getProducts = catchAsync(async (req: Request, res: Response) => {

                                                    
    const find = pick(req.query,["status","highlighted","categoryId"]) 
    const rangePriceQuery = pick(req.query,["minPrice","maxPrice"]) 
    const rangePrice = getRangePrice(
        parseInt(rangePriceQuery.minPrice as string) || 0,
        parseInt(rangePriceQuery.maxPrice as string) 
    ) 
    
    const filter: Record<string,any> ={...find, ...rangePrice}
    const keyword = req.query.keyword as string 
    if(keyword){
        filter.title = buildRegExp(keyword)
    }
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
    //this slug is of category slug 
    const slug = req.query.slug as string 
    if(slug){
        const category = await getCategoryBySlug(slug)
        if(!category){
            throw new ApiError(404,"Category is not found")
        }
        filter.categoryId = category.id
    }
    const products = await ProductService.getAllProductsByQuery({
        filter,
        pagination,
        sort,
        selectFields: only
    })

    res.status(200).json({products, pagination})

}) 

//[POST] "/api/products"
export const createProduct = catchAsync(async (req: Request, res: Response) => {
    const body = req.body 
    const product = await ProductService.createProduct(body)
    res.status(201).json({message: "create successful products", product})
})

//[PATCH] "/api/products"
export const updateProducts = catchAsync(async (req: Request, res: Response) => {
    //Format like
    // {
    //     ids: ["1","2","3"],
    //     updates: {
    //         status: "active"
    //     }
    // }
    const {ids, updates}: {ids: string[],updates: Record<string,any>} = req.body 
    
    const products = await Promise.all(ids.map(item => ProductService.updateProductById(item,updates)))
    res.status(200).json({message: "updated product successfully",products})

})

//[GET] "/api/products/:id"
export const getProduct = catchAsync(async (req: Request, res: Response) => {
    const {id} = req.params 
    const product = await ProductService.getProductByid(id);
    if(!product){
        throw new ApiError(404,"product is not found")
    }
    res.json({product})
}) 

//[GET] "/api/products/:slug"
export const getProductBySlug = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug 
    const product = await ProductService.getProductBySlug(slug);
    if(!product){
        throw new ApiError(404,"product is not found")
    }
    res.json({product})
}) 

//[PATCH] "/api/products/:id"
export const updateProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const body = req.body 
    const product = await ProductService.updateProductById(id, body)
    res.status(200).json({message: "Product update was successful", product})
    

}) 

//[PATCH] "/api/products/:id/delete"
export const deleteProduct = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id 
    const product = await ProductService.updateProductById(id, {deleted: true})
    res.status(200).json({message: "Product update was successful", product})
})