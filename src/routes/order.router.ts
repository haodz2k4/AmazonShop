import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/order.controller"

router
    .route("/")
    .get(controller.getOrders)
    .post(controller.createOrder)

router
    .route("/:id")
    .get(controller.getOrder) 
    
export default router 