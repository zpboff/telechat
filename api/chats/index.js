var app = require('express')();
var http = require('http').createServer(app);
var { SocketPort } = require('../constants/appSettings');
var io = require('socket.io')(http);
var userProvider = require('./providers/userProvider');

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', async socket => {
	const email = socket.handshake.query['email'];
	console.log(`a user ${email} connected`);
	await userProvider.updateStatus(email, true);
	socket.on('disconnect', async () => {
		console.log(`a user disconnected`);
		await userProvider.updateStatus(email, false);
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
