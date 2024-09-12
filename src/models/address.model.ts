import { ObjectId, Schema, model } from "mongoose";

export interface IAddress {
    userId: ObjectId,
    city: string,
    street: string,
    district: string,
    isDefault?: boolean,

}

const addressSchema = new Schema<IAddress>({
    city: {type: String, required: true},
    street: {type: String, required: true},
    district: {type: String, required: true},
    isDefault: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

export default model<IAddress>('address',addressSchema)