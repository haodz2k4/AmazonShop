import { Schema, model } from "mongoose";
import toJSONPlugin from "./plugins/toJSON.plugin";
export interface ISettingGeneral {
    websiteName: string,
    logo: string,
    phone: string,
    email: string,
    address: string,
    copyRight: string 
}

const settingGeneralSchema = new Schema<ISettingGeneral>({
    websiteName: {type: String, required: true},
    logo: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    address: {type: String, required: true},
    copyRight: {type: String, required: true},

})
settingGeneralSchema.plugin(toJSONPlugin) 

export default model('settings',settingGeneralSchema)