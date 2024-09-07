import { Router } from "express";
const router: Router = Router()
import * as controller from "../controllers/inventory.controller"
router.get("/",controller.getInventories)

export default router