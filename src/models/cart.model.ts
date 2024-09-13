import { ObjectId, Schema, model } from "mongoose";

export interface ICart {
    userId: ObjectId,
    products?: {
        productId: ObjectId,
        quantity: number
    }[]
}

const cartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    products: [
        {
            type: {
                productId: {type: Schema.Types.ObjectId, ref: 'product'},
                quantity: {type: Number, min: 0}
            },
            default: []
        }
    ]
})

export default model('cart',cartSchema)