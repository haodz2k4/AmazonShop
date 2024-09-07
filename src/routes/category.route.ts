import { Router } from "express";
const router: Router  = Router()
import * as controller from "../controllers/category.controller"

import { uploadSingle } from "../middlewares/uploadCloud.middleware";
import multer from "multer"
const upload = multer()
router
    .route("")
    .get(controller.getCategories)
    .post(upload.single('thumbnail'),uploadSingle,controller.createCategory)

router
    .route("/:id")
    .get(controller.getCategory) 

router.get("/slug/:slug",controller.getCategoryBySlug)
export default router