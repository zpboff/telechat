var app = require('express')();
var http = require('http').createServer(app);
var { SocketPort } = require('../constants/appSettings');
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', socket => {
	const id = socket.handshake.query['id'];
	console.log(`a user ${id} connected`);
	socket.on('disconnect', async () => {
		console.log(`a user ${id} disconnected`);
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
