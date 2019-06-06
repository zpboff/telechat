const Events = require('../../events')
const { login, register } = require('../providers/authProvider')

module.exports = socket => {
    
    socket.on(Events.REGISTER, register);
    
    socket.on(Events.LOGIN, login);

    socket.on(Events.ERROR, (err) => {
        console.log("Received error from socket:", socket.id);
        console.log(err);
    });
};
