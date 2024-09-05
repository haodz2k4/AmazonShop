import {Express} from "express"
import productRouter from "./product.route"

const path = '/api'
export default (app: Express) => {

    app.use(`${path}/products`,productRouter)
}