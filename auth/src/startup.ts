import express, {Response} from "express";
import cors from "cors";
import {json} from "body-parser";
import cookieParser from "cookie-parser";
import {errorMiddleware, loggerMiddleware, siteIsWorkingMiddleware} from "./middlewares";
import {authRouter, testRouter, usersRouter} from "./routes";
import {configs} from "./configs";

export function runServer() {
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
}