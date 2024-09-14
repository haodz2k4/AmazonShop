import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as OrderService from "../services/order.service"
import paginateHelper from "../helpers/paginate.helper";
import * as UserService from "../services/user.service"
import { ApiError } from "../utils/error";
import pick from "../utils/pick";

//[GET] "/api/orders"
export const getOrders = catchAync(async (req: Request, res: Response) => {

    const user = res.locals.user 
    const account = res.locals.account 
    if(user){
        const filter = {userId: user.id}
        const totalDocument = await OrderService.getTotalDocument(filter)
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const pagination = paginateHelper(page, limit,totalDocument)
        const order = await OrderService.getOrdersByQuery({filter,pagination})
        res.json({order})
    }else if(account) {

        const filter = pick(req.query,["status"])
        //pagination 
        const totalDocument = await OrderService.getTotalDocument(filter)
        const page = parseInt(req.query.page as string) || 1
        const limit = parseInt(req.query.limit as string) || 10
        const pagination = paginateHelper(page, limit,totalDocument) 

        const sort: Record<string, "asc" | "desc"> = {}
        const sortKey = req.query.sortKey as string 
        const sortValue = req.query.sortValue as "asc" | "desc" 
        if(sortKey && sortValue){
            sort[sortKey] = sortValue
        }
        //select 
        const selectFields = req.query.only as string 
        const order = await OrderService.getOrdersByQuery({filter,pagination, sort,selectFields})
        res.json({order})
    }else{
        throw new ApiError(401,"Can not found roles")
    }
})

//[POST] "/api/orders"
export const createOrder = catchAync(async (req: Request, res: Response) => {
    const body = req.body
    
    const user = res.locals.user
    body.userId = user.id
    const order = await OrderService.createOrder(body)
    res.status(201).json({message: "created order successfully", order})
})

//
//[GET] "/api/orders/:id"
export const getOrder = catchAync(async (req: Request, res: Response) => {
    const user = res.locals.user 
    const {id} =req.params 
    if(user){
        const order = await OrderService.getOrderByUserIdAndOrderId(user.id,id)
        
        res.json({order})
    }else{
        const order = await OrderService.getOrderById(id)
        res.json({order})
    }
})

//[PATCH] "/api/orders/:id/:status"
export const changeStatus = catchAync(async (req: Request, res: Response) => {

    const account = res.locals.account 
    if(!account){
        throw new ApiError(403,"You do not have enough authority")
    }
    const {id, status} = req.params 
    const order = await OrderService.updateOrderById(id, {status})
    res.status(200).json({message: "Updated order successfully", order})
} )