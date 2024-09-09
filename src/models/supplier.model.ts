import { ObjectId, Schema,model } from "mongoose";
import { isEmail, isMobilePhone } from "validator";
import toJSONPlugin from "./plugin/toJSON.plugin";
export interface ISupplier {
    _id: ObjectId,
    name: string,
    contactInfo: {
        email: string
        phone: string
        address: string 
    },
    deleted: boolean
    status: string 
}
const supplierSchema = new Schema<ISupplier>({
    name: {type: String, required: true, maxlength: 150},
    contactInfo: {
        email: {
            type: String, 
            required: true, 
            unique: true,
            validate: {
                validator: function(value: string) {
                    return isEmail(value)
                },
                message: "Invalid Email"
        }},
        phone: {
            type: String,
            required: true,
            validate: {
                validator: function(value: string) {
                    return isMobilePhone(value)
                },
                message: "Invalid phone number"
            }
        }
    },
    deleted: {type: Boolean, default: false},
    status: {type: String, enum: ["active","inactive"],default: "active"}
})
supplierSchema.plugin(toJSONPlugin)
export default model('supplier',supplierSchema)