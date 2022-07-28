let messages = []

export default function messageHandlers(io, socket) {
    const updateMessageList = () => {
        io.emit('message_list:update', messages)
    }

    socket.on('message:add', message => {
        messages.push(message)
        updateMessageList()
    })
}