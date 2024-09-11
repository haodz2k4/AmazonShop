import { Router } from "express";
const router: Router  = Router()
import * as controller from "../controllers/category.controller"

import { uploadSingle } from "../middlewares/uploadCloud.middleware";
import multer from "multer"
const upload = multer()

import { validate } from "../middlewares/validate.middleware";
import * as ValidateSchema from "../validations/category.validation"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware";


router.get("/:id/admin",requireAuth,requirePermissions('category_view'),controller.getCategories)
router.get("/admin",requireAuth,requirePermissions('category_view'),controller.getCategory)
router
    .route("")
    .get(validate(ValidateSchema.getCategories),controller.getCategories)
    .post(requireAuth,requirePermissions('category_create'),validate(ValidateSchema.createCategory),upload.single('thumbnail'),uploadSingle,controller.createCategory)

router
    .route("/:id")
    .get(validate(ValidateSchema.getCategory),controller.getCategory) 

router.get("/slug/:slug",validate(ValidateSchema.getCategoryBySlug),controller.getCategoryBySlug)
export default router