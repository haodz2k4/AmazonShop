import { Types } from 'mongoose';
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
        if(productIndex > -1){
            
            cart.products[productIndex].quantity  += quantity
        }else{
            
            cart.products.push({ productId: new Types.ObjectId(productId), quantity });
        }
        return await cart.save()
    }else{
        return await Cart.create({userId,products: [{productId, quantity}]})
    }
}

export const updateProductFromCart = async (userId: string, productId: string, quantity: number) => {
    const cart = await Cart.findOneAndUpdate({userId,products: {productId}},{quantity})
    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }
    return cart 
}

export const updateCartByUserid = async (userId: string, bodyCart: Partial<ICart>) => {
    const cart = await getCartByUserid(userId)
    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }
    Object.assign(cart, bodyCart)
    await cart.save()
    return cart 
}

export const removeProductFromCart = async(userId: string, productId: string) => {
    const cart = await Cart.findOneAndUpdate({userId},{$pull: {products: {productId: productId}}}, {new: true})
    if(!cart){
        throw new ApiError(404,"Cart is not found")
    }

    return cart 
}