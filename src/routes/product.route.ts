import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import multer from "multer"
const upload = multer()
import { cacheMiddleware } from "../middlewares/cache.middleware"

router
    .route("/")
    .get(cacheMiddleware('products',7200),controllers.getProducts)
    .post(upload.single('thumbnail'),uploadSingle,controllers.createProduct)

router
    .route("/:id")
    .get(cacheMiddleware('products',7200),controllers.getProduct) 
    .patch(upload.single('thumbnail'),uploadSingle,controllers.updateProduct)
router.get("/slug/:slug",controllers.getProductBySlug)
router.patch("/:id/delete",controllers.deleteProduct)
export default router