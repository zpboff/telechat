import { Request, Response } from "express";
import express from 'express';
import { logRequest } from "./middlewares/loggingMiddleware";
import { configs } from "./config";
import { serve, setup } from 'swagger-ui-express';
import swaggerDocument from './swagger.json';
import bodyparser from 'body-parser';

const app = express();
app.use(logRequest);
app.use('/swagger', serve, setup(swaggerDocument));

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello world');
})

app.listen(configs.port, () => {
    console.log(`Start listening for port ${configs.port}...`);
})