import {Router} from "express"
const router: Router = Router()
import * as controller from "../controllers/role.controller"
import { requirePermissions } from "../middlewares/auth.middleware"
router
    .route("/")
    .get(requirePermissions('role_view'),controller.getRoles) 
    .post(requirePermissions('role_create'),controller.createRole)
router
    .route("/:id")
    .patch(requirePermissions('role_edit'),controller.updateRole)
    .get(requirePermissions('role_view'),controller.getRole)

router.patch("/:id/delete",requirePermissions('role_delete'),controller.deleteRole)
export default router
    