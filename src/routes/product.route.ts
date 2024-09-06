import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import multer from "multer"
const upload = multer()
import { cacheMiddleware } from "../middlewares/cache.middleware"
import { validate } from "../middlewares/validate.middleware"
import * as Schema from "../validations/product.validation"
router
    .route("/")
    .get(validate(Schema.getProducts),cacheMiddleware('products',3600),controllers.getProducts)
    .post(upload.single('thumbnail'),uploadSingle,validate(Schema.createProduct),controllers.createProduct)
    .patch(upload.single('thumbnail'),uploadSingle,validate(Schema.updateProducts),controllers.updateProducts)

router
    .route("/:id")
    .get(cacheMiddleware('product',7200),validate(Schema.getProduct),controllers.getProduct) 
    .patch(upload.single('thumbnail'),validate(Schema.updateProduct),uploadSingle,controllers.updateProduct) 
    
router.get("/slug/:slug",validate(Schema.getProductBySlug),cacheMiddleware('product',7200),controllers.getProductBySlug)
router.patch("/:id/delete",validate(Schema.deleteProdut),controllers.deleteProduct)
export default router