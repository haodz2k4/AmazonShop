import {Express} from "express"
import productRouter from "./product.route"
import categoryRouter from "./category.route"
import inventoryRouter from "./inventory.router"
import accountRouter from "./account.router"
import supplierRouter from "./supplier.router"
import roleRouter from "./role.router"
import settingRouter from "./setting.router"
import userRouter from "./user.router"
import cartRouter from "./cart.router"
import orderRouter from "./order.router"
const path = '/api'

import { requireAuth } from "../middlewares/auth.middleware"
export default (app: Express) => {

    app.use(`${path}/products`,productRouter)
    app.use(`${path}/categories`,categoryRouter)
    app.use(`${path}/inventories`,requireAuth,inventoryRouter)
    app.use(`${path}/accounts`,accountRouter)
    app.use(`${path}/suppliers`,requireAuth,supplierRouter)
    app.use(`${path}/roles`,requireAuth,roleRouter)
    app.use(`${path}/settings`,settingRouter)
    app.use(`${path}/users`,userRouter)
    app.use(`${path}/cart`,requireAuth,cartRouter)
    app.use(`${path}/orders`,requireAuth,orderRouter)
}