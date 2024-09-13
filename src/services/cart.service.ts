import Cart, {ICart} from "../models/cart.model"
import { ApiError } from "../utils/error"

export const createCart = async (bodyCart: ICart) => {
    return await Cart.create(bodyCart)
}

export const getCartByUserid = async (userId: string) => {
    const cart = await Cart.findOne({userId}).populate('products.productId','')
    if(!cart){
        return await Cart.create({userId, products: []})
    }
    return cart 

}

export const addProductToCartByuserid = async (userId: string,productId: string, quantity: number = 1) => {
    const cart = await Cart.findOne({userId})
    if(cart){
        const productIndex = cart.products?.findIndex(item =>  item.productId.toString() === productId)
        cart.products[productIndex].quantity  += quantity
        return await cart.save()
    }else{
        return await Cart.create({userId,products: [{productId, quantity}]})
    }
}