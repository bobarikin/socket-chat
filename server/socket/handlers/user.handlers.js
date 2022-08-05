let users = []

export default function userHandlers(io, socket) {
    const { userName } = socket

    const updateUserList = () => {
        io.emit('user_list:update', users)
    }

    socket.on('user:add', async user => {
        console.log(user);
        socket.broadcast.emit('log', `User ${userName} connected!`)
        user.socketId = socket.id
        users.push(user)
        updateUserList()
    })

    socket.on('disconnect', () => {
        if (!users) return
        io.emit('log', `User ${userName} disconnected.`)
        users = users.filter(u => u.socketId != socket.id)
        updateUserList()
    })
}