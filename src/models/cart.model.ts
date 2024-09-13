import { ObjectId, Schema, model } from "mongoose";
import Product from "../models/product.model"
import toJSONPlugin from "./plugins/toJSON.plugin";
export interface ICart {
    userId: ObjectId,
    products: {
        productId: ObjectId,
        quantity: number
    }[]
}

const cartSchema = new Schema<ICart>({
    userId: {type: Schema.Types.ObjectId, ref: 'user'},
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            ref: 'product',
            required: [true, 'Product ID is required'],
            validate: {
                validator:async function(data):Promise<boolean> {
                    const product = await Product.findById({_id: data})
                    return !!product
                },
                message: 'Product is not exists'
            },
        },
        quantity: { type: Number, default: 1 }
    }]
})

cartSchema.plugin(toJSONPlugin)

export default model('cart',cartSchema)