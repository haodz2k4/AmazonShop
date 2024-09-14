import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/order.controller"

router.get("/",controller.getOrders)

export default router 