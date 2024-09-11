import {Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/role.controller"
router
    .route("/")
    .get(controller.getRoles) 
    .post(controller.createRole)

router
    .route("/:id")
    .patch(controller.updateRole)

router.patch("/:id/delete",controller.deleteRole)
router.get("/permissions",controller.getPermission)
export default router
    