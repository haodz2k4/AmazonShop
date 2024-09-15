import { Router } from "express";
import * as controller from "../controllers/favorite.controller"
const router: Router = Router()

router
    .route("/")
    .get(controller.getFavorites) 
    .post(controller.addProductToFavorite)

export default router