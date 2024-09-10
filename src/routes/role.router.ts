import {Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/role.controller"
router
    .route("/")
    .get(controller.getRoles) 

export default router
    