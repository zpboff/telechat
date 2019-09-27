var app = require('express')();
var http = require('http').createServer(app);
var { SocketPort } = require('../constants/appSettings');

app.get('/', function(req, res) {
	res.sendStatus(200);
});

http.listen(SocketPort, function() {
	console.log(`Listening on *:${SocketPort}`);
});
