const AppSettings = require("./constants/appSettings");
const socketManager = require('./managers/socketManager')
const initializeDbConnection = require('./db/connector')
const cookieParser = require('cookie-parser');
const bodyParser = require("body-parser");
const passport = require('passport');
const express = require('express')
var cors = require("cors");

initializeDbConnection();
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

var server = require("http").createServer(app);
var io = require('socket.io')(server);

io.on("connection", socketManager);

app.get('/', (req, res) => {
    res.sendStatus(200);
})

server.listen(AppSettings.SocketPort, () => {
    console.log(`Socket listening on *:${AppSettings.SocketPort}`);
});
