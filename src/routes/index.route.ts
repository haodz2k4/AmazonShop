import {Express} from "express"
import productRouter from "./product.route"
import categoryRouter from "./category.route"
const path = '/api'
export default (app: Express) => {

    app.use(`${path}/products`,productRouter)
    app.use(`${path}/categories`,categoryRouter)
}