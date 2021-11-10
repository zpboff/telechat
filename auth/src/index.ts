import {Response} from "express";
import {json} from "body-parser";
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import {configs} from './configs';
import {authRouter, usersRouter, testRouter} from './routes'
import {errorMiddleware, loggerMiddleware, siteIsWorkingMiddleware} from "./middlewares";

const app = express();
app.use(cors((req, callback) => {
    callback(null, {
        origin: true,
        credentials: true
    })
}));
app.use(json());
app.use(cookieParser());

app.use(loggerMiddleware);
app.use(errorMiddleware);
app.use(siteIsWorkingMiddleware);

app.use('/auth', authRouter);
app.use('/users', usersRouter);
app.use('/test', testRouter);

app.get('/', (_, res: Response) => {
    return res.status(200);
});

app.listen(configs.port, () => console.log(`Listen ${configs.port} you little shit!`));
