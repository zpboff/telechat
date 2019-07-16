const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const initializeDbConnection = require('./db/connector');
const authRoute = require('./routes/authRoute');
const appSettings = require('./constants/appSettings');

initializeDbConnection();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', authRoute);

app.listen(appSettings.MainPort, () => console.log(`LISTENING ON PORT ${appSettings.MainPort}`));