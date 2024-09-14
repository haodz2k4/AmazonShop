import { ObjectId, Schema, model } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugin";
import User from "./user.model"
export interface IAddress {
    _id?: ObjectId,
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
        required: true,
        validate: {
            validator: async function(val) {
                const user = await User.findOne({_id: val, deleted: false})
                return !!user 
            },
            message: 'User is not found'
        }
    }
})

addressSchema.plugin(toJSONPlugin)
/*If a new user adds the first address, that address is the default */
addressSchema.pre('save', async function(next) {
    const address = await model('address').findOne({userId: this.userId})
    if(!address){
        this.isDefault = true 
    }

    next()
})

export default model<IAddress>('address',addressSchema)