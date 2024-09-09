import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/inventory.controller"
import { validate } from "../middlewares/validate.middleware";
import * as SchemaValidation from "../validations/inventory.validation"
router
    .route("/")
    .get(validate(SchemaValidation.getInventories),controller.getInventories)
    .post(validate(SchemaValidation.createInventory),controller.createInventory)

router
    .route("/:id")
    .get(validate(SchemaValidation.getInventory),controller.getInventory)
    .patch(validate(SchemaValidation.updateInventory),controller.updateInventory)
    .delete(validate(SchemaValidation.deleteInventory),controller.deleteInventory)
export default router