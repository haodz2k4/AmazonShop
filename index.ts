import express from "express"
const app = express()
//dotenv 
import dotenv from "dotenv"
dotenv.config()
import config from "./src/config/config"

const port = config.port
app.listen(config.port,() => {
    console.log(`Server is running on port: http://localhost:${port}`)
})