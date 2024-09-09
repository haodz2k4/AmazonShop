import { Router } from "express";

const router: Router = Router() 
import * as controller from "../controllers/supplier.controller"
router
    .route("/")
    .get(controller.getSuppliers)
    .post(controller.createSupplier)
router
    .route("/:id")
    .get(controller.getSupplier)
    .patch(controller.updateSupplier)

router.patch("/:id/delete",controller.deleteSupplier)
export default router 