const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDbConnection = require('../db/connector');
const authRoute = require('./routes/authRoute');
const userRoute = require('./routes/userRoute');
const chatRoute = require('./routes/chatRoute');
const appSettings = require('../constants/appSettings');

initializeDbConnection();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/chats', chatRoute);

app.get('/', function(req, res) {
	res.sendStatus(200);
});

app.listen(appSettings.MainPort, () => console.log(`LISTENING ON PORT ${appSettings.MainPort}`));
