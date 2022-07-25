import express from 'express'
import { createServer } from 'http'

const app = express()

const PORT = process.env.PORT || 5000

const server = createServer(app)

server.listen(PORT, () => 
    console.log(`🚀 Server has been started on port ${PORT}...`)
)