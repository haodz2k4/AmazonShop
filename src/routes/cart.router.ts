import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/cart.controller"


router.delete("/clear",controller.clearProductFromCart)
router.get("/",controller.getCart)

router
    .route("/:productId")
    .post(controller.addProductToCart)
    .patch(controller.updateProductFromCart)
    .delete(controller.removeProductFromCart)
export default router