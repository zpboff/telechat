import { Request, Response } from "express";
import express from 'express';
import { logRequest } from "./middlewares/loggingMiddleware";
import { configs } from "./config";

const app = express();
app.use(logRequest);

app.get('/', (req: Request, res: Response) => {
    return res.send('Hello world');
})

app.listen(configs.port, () => {
    console.log(`Start listening for port ${configs.port}...`);
})