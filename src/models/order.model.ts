import { Types, Schema, model } from "mongoose";
import Address from "../models/address.model"
import User from "../models/user.model"
import Product from "../models/product.model"
import { ApiError } from "../utils/error";
import toJSONPlugin from "./plugins/toJSON.plugin";
export interface IOrder {
    _id?: Types.ObjectId,
    userId: Types.ObjectId,
    addressId: Types.ObjectId,
    products: {
        productId: Types.ObjectId,
        quantity: number,
    }[],
    status: string
}

const orderSchema = new Schema<IOrder>({
    userId: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true,
        validate: {
            validator: async function(val) {
                const user = await User.findOne({_id: val, deleted: false})
                return !!user  
            },
            message: 'user is not exists'
        }
    },
    addressId: {
        type: Schema.Types.ObjectId, 
        validate: {
            validator: async function(val) {
                const address = await Address.findById(val)
                return !!address
            },
            message: 'address is not exists'
        }
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId,
            required: true, 
            ref: 'product',
            validate: {
                validator: async function(val) {
                    const product = await Product.findById(val)
                    return !!product
                },
                message: 'product is not found'
            }
        },
        quantity: {type: Number, min: 1}
    }],
    status: {
        type: String,
        enum: ["pending", "confirmed", "processing", "packed", "delivered", "cancelled"],
        default: "pending", 
        required: true
    }
}, {timestamps: true}); 

orderSchema.plugin(toJSONPlugin)

orderSchema.pre('save', async function(next) {
    
    const address = await Address.findOne({
        userId: this.userId,
        isDefault: true 
    }) 
    if(!address){
        throw new ApiError(404,"User is not have any address or not any default address")
    }
    this.addressId = address?.id
    next()
})

export default model<IOrder>('order', orderSchema);
