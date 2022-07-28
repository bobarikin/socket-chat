import express from 'express'
import mongoose from 'mongoose'
import { createServer } from 'http'
import { MONGODB_URI, ALLOWED_ORIGIN } from './config.js'
import cors from 'cors'
import { Server } from 'socket.io'
import authRouter from './routes/auth.routes.js'
import onConnection from './socket/onConnection.js'

const app = express()

const PORT = process.env.PORT || 5000

const server = createServer(app)

app.use(cors({ origin: '*' }))

app.use(express.json({ extended: true }))

app.use('/api/auth/', authRouter)

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

const io = new Server(server, {
    cors: ALLOWED_ORIGIN,
    serveClient: false,
})

io.on('connection', socket => {
    onConnection(io, socket)
})

server.listen(PORT, () => 
    console.log(`🚀 Server has been started on port ${PORT}...`)
)