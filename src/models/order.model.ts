import { Types, Schema, model } from "mongoose";

interface IOrder {
    _id: Types.ObjectId,
    user_id: Types.ObjectId,
    address: {
        city: string,
        street: string,
        district: string,
    },
    products: {
        productId: Types.ObjectId,
        price: number,
        discountPercentage: number,
        quantity: number,
    }[],
    status: string
}

const orderSchema = new Schema<IOrder>({
    user_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'user', 
        required: true 
    },
    address: {
        city: { 
            type: String, 
            required: true 
        },
        street: { 
            type: String, 
            required: true 
        },
        district: { 
            type: String, 
            required: true 
        }
    },
    products: [{
        productId: {
            type: Schema.Types.ObjectId, 
            ref: 'product',
            required: true 
        },
        price: {
            type: Number, 
            min: 0, 
            required: true 
        },
        discountPercentage: {
            type: Number, 
            min: 0, 
            max: 100, 
            default: 0 
        },
        quantity: {
            type: Number, 
            min: 1, 
            required: true 
        }
    }],
    status: {
        type: String,
        enum: ["pending", "confirmed", "processing", "packed", "delivered", "cancelled"],
        default: "pending", 
        required: true
    }
}, {timestamps: true}); 

export default model<IOrder>('order', orderSchema);
