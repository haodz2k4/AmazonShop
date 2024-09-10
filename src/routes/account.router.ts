import { Router } from "express";
import * as controller from "../controllers/account.controller"
const router: Router = Router()
import multer from "multer"
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware";
router
    .route("")
    .get(controller.getAccounts)
    .post(upload.single('avatar'),uploadSingle,controller.createAccount)

router
    .route("/:id")
    .get(controller.getAccount)
    .patch(upload.single('avatar'),uploadSingle,controller.updateAccount)
router.patch("/:id/delete",controller.deleteAccount)
router.post("/login",controller.loginAccount)

export default router