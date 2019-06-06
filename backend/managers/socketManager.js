const Events = require("../../events");
const { login, register } = require("../providers/authProvider");

module.exports = socket => {
    
    socket.on(Events.REGISTER, user => register(user, data => socket.emit(Events.REGISTER, data)));

    socket.on(Events.LOGIN, user => login(user, data => socket.emit(Events.LOGIN, data)));

    socket.on(Events.ERROR, err => {
        console.log("Received error from socket:", socket.id);
        console.log(err);
    });
};
