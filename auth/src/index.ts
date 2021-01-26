import { Request, Response } from "express";

const express = require('express');
const config = require('../config.json');

const environment = process.env.NODE_ENV || 'development';
const currentConfig = config[environment];
const app = express();


app.get('/', (req: Request, res: Response) => {
    return res.send('Hello world');
})

app.listen(currentConfig.port, () => {
    console.log(`Start listening for port ${currentConfig.port}...`);
})