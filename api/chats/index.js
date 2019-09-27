var app = require('express')();
var http = require('http').createServer(app);
var { SocketPort } = require('../constants/appSettings');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', function(socket) {
	console.log(`a user ${socket} connected`);
	socket.on('disconnect', function() {
		console.log(`a user ${socket} disconnected`);
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
