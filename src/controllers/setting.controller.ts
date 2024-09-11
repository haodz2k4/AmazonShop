import { Request, Response } from "express";
import catchAync from "../utils/catchAync";
import * as Setting from "../services/setting.service"

export const getSettingGeneral = catchAync(async (req: Request, res: Response) => {
    const settingGeneral = await Setting.getSettingGeneral();
    res.json({settingGeneral})
})

export const updateSettingGeneral = catchAync(async (req: Request, res: Response) => {
    const body = req.body 

    const settingGeneral = await Setting.updateSettingGeneral(body)
    res.status(200).json({settingGeneral})
})