import { Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/user.controller"
import multer = require("multer")
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware"

router.post("/login",controller.loginUser)
router
    .route("/")
    .get(requireAuth,requirePermissions('user_view'),controller.getUsers) 
    .post(upload.single('avatar'),uploadSingle,controller.createUser)
router
    .route("/profiles")
    .get(requireAuth, controller.getProfileUser)
    .patch(requireAuth, controller.updateProfileUser)
router
    .route("/:id")
    .get(requireAuth,requirePermissions('user_view'),controller.getUser)
    .patch(requireAuth,requirePermissions('user_edit'),upload.single('avatar'),uploadSingle,controller.updateUser)

router.get("/:id/addresses",controller.getAddresses)
router
    .route("/addresses")
    .post(requireAuth,controller.addAddress)
router
    .route("/address/:id")
    .delete(requireAuth,controller.removeAddress)

router.post("/forgot-password",controller.forgotPassword)
router.post("/verify-otp",controller.verifyOtp)

//soft deleted
router.patch("/:id/delete",requireAuth,requirePermissions('user_delete'),controller.deleteUser)
export default router