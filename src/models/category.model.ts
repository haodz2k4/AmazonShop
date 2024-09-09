import { ObjectId, Schema, model } from "mongoose";
import { isURL } from "validator";
import toJSONPlugin from "./plugins/toJSON.plugin";
export interface ICategory {
    _id: ObjectId
    title: string
    thumbnail: string 
    description: string,
    deleted: boolean,
    slug: string,
    status: string,
    parentCategory: ObjectId
    createdAt?: Date
    updatedAt?: Date 
}
const categorySchema = new Schema<ICategory>({
    title: {type: String, required: true, minlength: 2, maxlength: 150},
    thumbnail:{
        type: String,
        validate: {
            validator: function(v: string):boolean {
                return isURL(v)
            },
            message: "invalid thumbnail url"
        }
    },
    description: String,
    deleted: {type: Boolean, default: false},
    slug: {type: String, unique: true},
    status: {
        type: String,
        enum: {values: ["active","inactive"], message: 'Status must be either "active" or "inactive"'},
        default: "active"
    },
    parentCategory: Schema.Types.ObjectId,
   
},{timestamps: true})
categorySchema.plugin(toJSONPlugin)
export default model<ICategory>("category",categorySchema)