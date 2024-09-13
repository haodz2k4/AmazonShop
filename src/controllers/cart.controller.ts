import { Request,Response } from "express";
import catchAync from "../utils/catchAync";
import * as CartService from "../services/cart.service";
import { ApiError } from "../utils/error";

//[GET] "/api/cart"
export const getCart = catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const cart = await CartService.getCartByUserid(userId)
    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }
    res.status(200).json({cart})
}) 
