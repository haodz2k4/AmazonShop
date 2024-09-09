import {Express} from "express"
import productRouter from "./product.route"
import categoryRouter from "./category.route"
import inventoryRouter from "./inventory.router"
import accountRouter from "./account.router"
const path = '/api'
export default (app: Express) => {

    app.use(`${path}/products`,productRouter)
    app.use(`${path}/categories`,categoryRouter)
    app.use(`${path}/inventories`,inventoryRouter)
    app.use(`${path}/accounts`,accountRouter)
}