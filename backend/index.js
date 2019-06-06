const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const AppSettings = require('./constants/appSettings')

const app = express();

app.listen(AppSettings.Port, () => {
	console.log(`Start listening on port ${AppSettings.Port}`)
})
