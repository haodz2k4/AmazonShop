import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as OrderService from "../services/order.service"
import paginateHelper from "../helpers/paginate.helper";

//[GET] "/api/orders"
export const getOrders = catchAync(async (req: Request, res: Response) => {

    const userId = res.locals.user.id 
    const filter = {userId}
    const totalDocument = await OrderService.getTotalDocument(filter)
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const pagination = paginateHelper(page, limit,totalDocument)
    const order = await OrderService.getOrdersByQuery({filter,pagination})
    res.json({order})
})

