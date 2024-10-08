import { Schema, model } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugin";

export interface IRole {
    title: string
    description: string 
    permissions: string[],
    deleted: boolean
}

const roleSchema = new Schema<IRole>({
    title: {type: String ,required: true},
    description: String,
    permissions:[{type: String,unique: true, default: []}],
    deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true}) 

roleSchema.plugin(toJSONPlugin)

export default model<IRole>('role',roleSchema)