import express from "express"
const app = express()
//dotenv 
import dotenv from "dotenv"
dotenv.config()
import config from "./src/config/config"


//error middleware 
import { errorHandle } from "./src/middlewares/error.middleware"
app.use(errorHandle)
import database from "./src/config/database"
database()
const port = config.port
app.listen(config.port,() => {
    console.log(`Server is running on port: http://localhost:${port}`)
})