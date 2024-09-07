import { ObjectId, Schema,model } from "mongoose";
import { isEmail, isURL } from "validator";
interface ISupplier {
    _id: ObjectId,
    name: string,
    contactInfo: {
        email: string,
        phone: string,
        address: string 
    }
}
const supplierSchema = new Schema<ISupplier>({
    name: {type: String, required: true, maxlength: 150},
    contactInfo: {
        email: {
            type: String, 
            required: true, 
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
                    return isURL(value)
                },
                message: "Invalid phone number"
            }
        },
        address: {type: String, required: true}
    }
})

export default model('supplier',supplierSchema)