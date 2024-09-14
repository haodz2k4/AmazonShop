import Favorite from "../models/favorite.model"

export const getFavoritesByUserid = async (userId: string) => {

    return await Favorite.find({userId}).populate('productIds')
}