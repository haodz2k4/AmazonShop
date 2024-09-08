import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/inventory.controller"
router
    .route("/")
    .get(controller.getInventories)
    .post(controller.createInventory)

export default router