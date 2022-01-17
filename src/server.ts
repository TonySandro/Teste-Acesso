import express from 'express'
// import connectMongoDB from './repositories/connection'
import { router } from './routes'

const app = express()

// connectMongoDB()

app.use(express.json())
app.use(router)

app.listen(3333, () => console.log("Server running"))