import { Request, Response } from "express"; 
import catchAync from "../utils/catchAync";
import * as FavoriteService from "../services/favorite.service"
import { ApiError } from "../utils/error";

//[GET] "/api/favorites"
export const getFavorites= catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const favorites = await FavoriteService.getFavoritesByUserid(userId)
    if(!favorites){
        throw new ApiError(404,"")
    }
    res.json({favorites})
})

//[POST] "/api/favories"
export const addProductToFavorite = catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id  
    const {productId} = req.body
    const favorites = await FavoriteService.addProductToFavorite(userId,productId)
    res.status(200).json({message: "Add product to favorite successfully", favorites})
})