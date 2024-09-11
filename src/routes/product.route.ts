import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import multer from "multer"
const upload = multer()
import { cacheMiddleware } from "../middlewares/cache.middleware"
import { validate } from "../middlewares/validate.middleware"
import * as Schema from "../validations/product.validation"
import { requireAuth, requirePermissions } from "../middlewares/auth.middleware"
router
    .route("/")
    .get(requirePermissions('product_view'),validate(Schema.getProducts),cacheMiddleware('products',3600),controllers.getProducts)
    .post(requireAuth,requirePermissions('product_create'),upload.single('thumbnail'),uploadSingle,validate(Schema.createProduct),controllers.createProduct)

router
    .route("/:id")
    .get(requirePermissions('product_view'),cacheMiddleware('product',7200),validate(Schema.getProduct),controllers.getProduct) 
    .patch(requireAuth,requirePermissions('product_update'),upload.single('thumbnail'),validate(Schema.updateProduct),uploadSingle,controllers.updateProduct) 
    
router.get("/slug/:slug",requirePermissions('product_view'),validate(Schema.getProductBySlug),cacheMiddleware('product',7200),controllers.getProductBySlug)
router.patch("/:id/delete",requireAuth,requirePermissions('product_delete'),validate(Schema.deleteProdut),controllers.deleteProduct)
export default router