const users = []

export default function userHandlers(io, socket) {
    const { userName } = socket

    const updateUserList = () => {
        io.emit('user_list:update', users)
    }

    socket.on('user:add', async user => {
        socket.emit('log', `User ${userName} connected!`)
        user.socketId = socket.id
        users.push(user)
        updateUserList()
    })

    socket.on('disconnect', async () => {
        if (!users) return
        socket.emit('log', `User ${userName} disconnected.`)
        users = users.filter(u => u.socketId !== socket.id)
        updateUserList()
    })
}