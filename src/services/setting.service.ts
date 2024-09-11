import SettingGeneral, {ISettingGeneral} from "../models/setting-general.model"

export const getSettingGeneral = async () => {
    return await SettingGeneral.findOne()
}

export const updateSettingGeneral = async (bodyGeneral:Partial<ISettingGeneral> ) => {
    const settingGeneral = await getSettingGeneral()
    if(settingGeneral){
        return await SettingGeneral.updateOne({},bodyGeneral)
    }else{
        return await SettingGeneral.create(bodyGeneral)
    }
}