import { Router } from "express";
import * as controller from "../controllers/favorite.controller"
const router: Router = Router()

router
    .route("/")
    .get(controller.getFavorites) 

export default router