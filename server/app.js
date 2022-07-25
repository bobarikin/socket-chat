import express from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { MONGODB_URI } from './config.js'

const app = express()

const PORT = process.env.PORT || 5000

const server = createServer(app)

try {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    console.log('🚀 Connected')
} catch (e) {
    console.log('DB connected error')
    process.exit(1)
}

server.listen(PORT, () => 
    console.log(`🚀 Server has been started on port ${PORT}...`)
)