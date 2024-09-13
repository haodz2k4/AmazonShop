import Cart, {ICart} from "../models/cart.model"

export const createCart = async (bodyCart: ICart) => {
    return await Cart.create(bodyCart)
}

export const getCartByUserid = async (userId: string) => {
    return await Cart
    .findOne({userId})
    .populate('products.productId')
}