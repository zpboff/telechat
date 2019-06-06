const io = require('socket.io-client')
const ConStrings = require('../constants/conStrings')

const socket = io.connect(ConStrings.ChatApiUrl)

registerHandler = (onMessageReceived) => {
  socket.on('message', onMessageReceived)
}

unregisterHandler = () => {
  socket.off('message')
}

socket.on('error', (err) => {
  console.log('received socket error:')
  console.log(err)
})

register = (name, cb) => {
  socket.emit('register', name, cb)
}

join = (chatroomName, cb) => {
  socket.emit('join', chatroomName, cb)
}

leave = (chatroomName, cb) => {
  socket.emit('leave', chatroomName, cb)
}

message =(chatroomName, msg, cb) => {
  socket.emit('message', { chatroomName, message: msg }, cb)
}

getChatrooms =(cb) => {
  socket.emit('chatrooms', null, cb)
}

getAvailableUsers = (cb) => {
  socket.emit('availableUsers', null, cb)
}