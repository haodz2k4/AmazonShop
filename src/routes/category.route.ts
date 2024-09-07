import { Router } from "express";
const router: Router  = Router()
import * as controller from "../controllers/category.controller"
router.get("",controller.getCategories)
router
    .route("/:id")
    .get(controller.getCategory) 

router.get("/slug/:slug",controller.getCategoryBySlug)
export default router