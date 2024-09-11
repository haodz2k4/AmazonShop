import { Router } from "express";

const router: Router = Router() 
import * as controller from "../controllers/supplier.controller"
import { requirePermissions } from "../middlewares/auth.middleware";
router
    .route("/")
    .get(requirePermissions('supplier_view'),controller.getSuppliers)
    .post(requirePermissions('supplier_create'),controller.createSupplier)
router
    .route("/:id")
    .get(requirePermissions('supplier_view'),controller.getSupplier)
    .patch(requirePermissions('supplier_edit'),controller.updateSupplier)

router.patch("/:id/delete",requirePermissions('supplier_delete'),controller.deleteSupplier)
export default router 