const app = require('express')();
const http = require('http').createServer(app);
const { SocketPort } = require('../constants/appSettings');
const io = require('socket.io')(http);
const initializeDbConnection = require('../db/connector');
const UserModel = require('../db/dataModel/user');

initializeDbConnection();

app.get('/', function(req, res) {
	res.sendStatus(200);
});

io.on('connection', async socket => {
	const id = socket.handshake.query['id'];
	console.log(`a user ${id} connected`);
	await UserModel.findByIdAndUpdate(id, { $set: { isOnline: true }})

	socket.on('disconnect', async () => {
		console.log(`a user ${id} disconnected`);
		await UserModel.findByIdAndUpdate(id, { $set: { isOnline: false }})
	});
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
