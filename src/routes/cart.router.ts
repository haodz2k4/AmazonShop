import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/cart.controller"

router.get("/",controller.getCart)
router
    .route("/:productId")
    .post(controller.addProductToCart)
    .delete(controller.removeProductFromCart)
export default router