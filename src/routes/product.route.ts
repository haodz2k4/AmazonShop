import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"
import { uploadSingle } from "../middlewares/uploadCloud.middleware"
import multer from "multer"
const upload = multer()


router
    .route("/")
    .get(controllers.getProducts)
    .post(upload.single('thumbnail'),uploadSingle,controllers.createProduct)

router
    .route("/:id")
    .get(controllers.getProduct) 
router.get("/slug/:slug",controllers.getProductBySlug)
export default router