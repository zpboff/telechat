import { Response } from "express";
import { json } from "body-parser";
import cookieParser from 'cookie-parser';
import express from 'express';
import { configs } from './configs';
import { authRouter } from './routes'
import { usersRouter } from "./routes/users";

const app = express();
app.use(json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

app.get('/', (_, res: Response) => {
    return res.status(200);
});

app.listen(configs.port, () => console.log(`Listen here you little shit! ${configs.port}`));
