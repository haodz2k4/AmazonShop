import express from "express"
const app = express()
//dotenv 
import dotenv from "dotenv"
dotenv.config()
import config from "./src/config/config"
import bodyParser from "body-parser"
app.use(bodyParser.json())
//Cookie parser 
import cookieParser from "cookie-parser"
app.use(cookieParser())
//route
import route from "./src/routes/index.route"
route(app)
//error middleware 
import { errorHandle } from "./src/middlewares/error.middleware"
app.use(errorHandle) 
//redis 
import redis from "./src/config/redis"
redis
//mongodb
import database from "./src/config/database"
database()
const port = config.port
app.listen(config.port,() => {
    console.log(`Server is running on port: http://localhost:${port}`)
})