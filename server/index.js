import express  from "express"
import mongoose from "mongoose"
import dotenv   from 'dotenv'
import cors from 'cors'

import authRoute from './routes/auth.js'
import postRoute from './routes/posts.js'
import fileUpload from 'express-fileupload'

const app = express()
dotenv.config()

//Const
const PORT = process.env.PORT || 3001
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

//Middleware
app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(express.static('uploads'))
// Routes
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@blog.egzyvso.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        )
        app.listen(PORT, () => console.log(`Server started on port: ${PORT}`)
        )
    } catch (error) {
        console.log(error)
    }
}
start()