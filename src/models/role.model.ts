import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    title: {type: String ,required: true},
    description: String,
    permissions: {
        type: [String],
        default: []
    },
    deleted: {
        type: Boolean,
        default: false
    }
},{timestamps: true}) 

export default model('role',roleSchema)