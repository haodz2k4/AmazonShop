import { Router } from "express";
import * as controller from "../controllers/account.controller"
const router: Router = Router()

router
    .route("")
    .get(controller.getAccounts)


export default router