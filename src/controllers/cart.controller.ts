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

//[DELETE] "/api/cart/:productId"
export const removeProductFromCart = catchAync(async (req: Request, res: Response) => {
    const {productId} = req.params 
    const userId = res.locals.user.id 
    const cart = await CartService.removeProductFromCart(userId, productId)
    res.status(200).json({message: "Removed product from cart successfully", cart})
}) 

//[PATCH] "/api/cart/:productId"
export const updateProductFromCart = catchAync(async (req: Request, res: Response) => {
    const {productId} = req.params 
    const quantity = req.body.quantity
    const userId = res.locals.user.id 
    const cart = await CartService.updateProductFromCart(userId,productId, quantity)
    res.status(200).json({message: "Updated product from cart successfullu", cart})
})
//[DELETE] "/api/cart/clear"
export const clearProductFromCart = catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const cart = await CartService.updateCartByUserid(userId,{products: []})
    res.status(200).json({message: "Cleared all product from cart successfully", cart})
})