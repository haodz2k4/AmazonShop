import Cart, {ICart} from "../models/cart.model"

export const createCart = async (bodyCart: ICart) => {
    return await Cart.create(bodyCart)
}