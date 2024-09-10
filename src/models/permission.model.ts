import { Schema, model } from "mongoose";

interface IPermission {
    name: string,
    descriptions: string 
}

const permissionSchema = new Schema<IPermission>({
    name: {type: String, required: true, unique: true},
    descriptions: String 
}) 

export default model<IPermission>("permissions",permissionSchema)