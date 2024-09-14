import { Request, Response } from "express"; 
import catchAync from "../utils/catchAync";
import * as FavoriteService from "../services/favorite.service"

export const getFavorites= catchAync(async (req: Request, res: Response) => {
    const userId = res.locals.user.id 
    const favorites = await FavoriteService.getFavoritesByUserid(userId)
    res.json({favorites})
})