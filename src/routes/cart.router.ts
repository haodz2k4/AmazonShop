import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/cart.controller"

router.get("/",controller.getCart)

export default router