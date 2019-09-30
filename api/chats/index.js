var app = require('express')();
var http = require('http').createServer(app);
var { SocketPort } = require('../constants/appSettings');
var io = require('socket.io')(http);
var userProvider = require('./providers/userProvider');

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', async socket => {
	const id = socket.handshake.query['id'];
	console.log(`a user ${id} connected`);
	await userProvider.updateStatus(id, true);
	socket.on('disconnect', async () => {
		console.log(`a user ${id} disconnected`);
		await userProvider.updateStatus(id, false);
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
