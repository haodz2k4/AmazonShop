import {Router} from "express"
const router: Router = Router()
import * as controllers from "../controllers/product.controller"

router.get("/",controllers.getProducts)

export default router