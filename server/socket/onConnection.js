import userHandlers from "./handlers/user.handlers"

export default function onConnection(io, socket) {
    userHandlers(io, socket)
    // messageHandlers(io, socket)
}