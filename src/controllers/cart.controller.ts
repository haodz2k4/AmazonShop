import { Request,Response } from "express";
import catchAync from "../utils/catchAync";
import * as CartService from "../services/cart.service";
import { ApiError } from "../utils/error";

//[GET] "/api/cart"
export const getCart = catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const cart = await CartService.getCartByUserid(userId)
    res.status(200).json({cart})
}) 

//[POST] "/api/cart/:productId" 
export const addProductToCart = catchAync(async (req: Request, res: Response) => {
    const {productId} = req.params 
    const quantity = req.body.quantity || 1
    const userId = res.locals.user.id 
    const cart = await CartService.addProductToCartByuserid(userId,productId,quantity)
    res.status(200).json({cart})
})