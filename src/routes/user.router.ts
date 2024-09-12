import { Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/user.controller"

router
    .route("/")
    .get(controller.getUsers) 

export default router