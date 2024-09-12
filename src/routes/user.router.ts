import { Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/user.controller"
import multer = require("multer")
const upload = multer()
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
router
    .route("/")
    .get(controller.getUsers) 
    .post(upload.single('avatar'),uploadSingle,controller.createUser)
router
    .route("/:id")
    .get(controller.getUser)
    .patch(upload.single('avatar'),uploadSingle,controller.updateUser)
router.patch("/:id/delete",controller.deleteUser)
export default router