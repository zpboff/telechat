const app = require('express')();
const http = require('http').createServer(app);
const { SocketPort } = require('../constants/appSettings');
const io = require('socket.io')(http);
const initializeDbConnection = require('../db/connector');
const userProvider = require('./providers/userProvider');

initializeDbConnection();

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', async socket => {
	const id = socket.handshake.query['id'];
	await userProvider.updateStatus(id, true);
	console.log(`a user ${id} connected`);

	socket.on('disconnect', async () => {
		await userProvider.updateStatus(id, false);
		console.log(`a user ${id} disconnected`);
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
