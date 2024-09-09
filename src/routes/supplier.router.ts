import { Router } from "express";

const router: Router = Router() 
import * as controller from "../controllers/supplier.controller"
router
    .route("/")
    .get(controller.getSuppliers)

router
    .route("/:id")
    .get(controller.getSupplier)

export default router 