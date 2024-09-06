import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import multer from "multer"
const upload = multer()
import { cacheMiddleware } from "../middlewares/cache.middleware"

router
    .route("/")
    .get(cacheMiddleware('products',3600),controllers.getProducts)
    .post(upload.single('thumbnail'),uploadSingle,controllers.createProduct)

router
    .route("/:id")
    .get(cacheMiddleware('product',7200),controllers.getProduct) 
    .patch(upload.single('thumbnail'),uploadSingle,controllers.updateProduct) 
    
router.get("/slug/:slug",cacheMiddleware('product',7200),controllers.getProductBySlug)
router.patch("/:id/delete",controllers.deleteProduct)
export default router