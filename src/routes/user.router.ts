import { Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/user.controller"
import multer = require("multer")
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware"
import * as ValidateSchema from "../validations/user.validation"
import { validate } from "../middlewares/validate.middleware"
import { addAddress } from "../services/user.service"
router.post("/login",controller.loginUser)
router
    .route("/")
    .get(requireAuth,validate(ValidateSchema.getUsers),requirePermissions('user_view'),controller.getUsers) 
    .post(upload.single('avatar'),validate(ValidateSchema.createUser),uploadSingle,controller.createUser)
router
    .route("/profiles")
    .get(requireAuth, controller.getProfileUser)
    .patch(requireAuth, controller.updateProfileUser)
router
    .route("/:id")
    .get(requireAuth,validate(ValidateSchema.getUser),requirePermissions('user_view'),controller.getUser)
    .patch(requireAuth,validate(ValidateSchema.updateUser),requirePermissions('user_edit'),upload.single('avatar'),uploadSingle,controller.updateUser)

router.get("/:id/addresses",validate(ValidateSchema.getAddress),controller.getAddresses)
router
    .route("/addresses")
    .post(requireAuth,validate(ValidateSchema.addAddress),controller.addAddress)
router
    .route("/address/:id")
    .delete(requireAuth,validate(ValidateSchema.removeAddress),controller.removeAddress)

    
router.post("/reset-password",validate(ValidateSchema.resetPassword),controller.resetPassword)
router.post("/forgot-password",validate(ValidateSchema.forgotPassword),controller.forgotPassword)
router.post("/verify-otp",validate(ValidateSchema.verifyOtp),controller.verifyOtp)
//soft deleted
router.patch("/:id/delete",requireAuth,requirePermissions('user_delete'),controller.deleteUser)
export default router