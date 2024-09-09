import { Router } from "express";
import * as controller from "../controllers/account.controller"
const router: Router = Router()

router
    .route("")
    .get(controller.getAccounts)

router
    .route("/:id")
    .get(controller.getAccount)
    .patch(controller.updateAccount)

export default router