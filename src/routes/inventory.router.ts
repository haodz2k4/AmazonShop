import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/inventory.controller"
import { validate } from "../middlewares/validate.middleware";
import * as SchemaValidation from "../validations/inventory.validation"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware";
router
    .route("/")
    .get(requirePermissions('inventory_view'),validate(SchemaValidation.getInventories),controller.getInventories)
    .post(requirePermissions('inventory_create'),validate(SchemaValidation.createInventory),controller.createInventory)

router
    .route("/:id")
    .get(requirePermissions('inventory_view'),validate(SchemaValidation.getInventory),controller.getInventory)
    .patch(requirePermissions('inventory_edit'),validate(SchemaValidation.updateInventory),controller.updateInventory)
    .delete(requirePermissions('inventory_delete'),validate(SchemaValidation.deleteInventory),controller.deleteInventory)
export default router