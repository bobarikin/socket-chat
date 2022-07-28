import userHandlers from "./handlers/user.handlers.js"

export default function onConnection(io, socket) {
    
    const { userName } = socket.handshake.query

    socket.userName = userName

    userHandlers(io, socket)
    // messageHandlers(io, socket)
}