const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const SocketManager = require('./socketManager')
const app = express();
var server = require('http').Server(app);

var io = (module.exports.io = require('socket.io')(server));

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', SocketManager);

server.