import { Router } from "express";
import * as controller from "../controllers/account.controller"
const router: Router = Router()
import multer from "multer"
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware";
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware";
router
    .route("")
    .get(requireAuth,requirePermissions('account_view'),controller.getAccounts)
    .post(requireAuth,requirePermissions('account_create'),upload.single('avatar'),uploadSingle,controller.createAccount) 

    
router.get("/logout",controller.logout)
router.post("/login",controller.loginAccount)
router.post("/refresh-token",controller.refreshToken) 

router
    .route("/:id")
    .get(requireAuth,requirePermissions('account_view'),controller.getAccount)
    .patch(requireAuth,requirePermissions('account_update'),upload.single('avatar'),uploadSingle,controller.updateAccount)
router.patch("/:id/delete",requireAuth,requirePermissions('account_delete'),controller.deleteAccount)


export default router