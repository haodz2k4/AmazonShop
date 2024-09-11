import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/setting.controller"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware";
import multer from "multer"
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware";

router
    .route("/general")
    .get(controller.getSettingGeneral) 
    .patch(requireAuth,upload.single('logo'),uploadSingle,controller.updateSettingGeneral)
router.get("/general/admin",requireAuth,controller.getSettingGeneral)

export default router