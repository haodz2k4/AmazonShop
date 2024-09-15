import Favorite from "../models/favorite.model"
import { ApiError } from "../utils/error"
import {Types} from "mongoose"

export const getFavoritesByUserid = async (userId: string) => {

    const favorite = await Favorite.findOne({userId}).populate('productIds')
    if(!favorite){
        return await Favorite.create({userId, productIds: []})
    }
    return favorite
}

export const getProductToFavorites = async (userId: string, productId: string) => {
    return await Favorite.findOne({userId, productIds: productId})
}

export const addProductToFavorite = async (userId: string,productId: string) => {
    const favorite = await getFavoritesByUserid(userId)
    console.log(favorite)
    favorite.productIds.push(new Types.ObjectId(productId))
    await favorite.save()
    return favorite
}