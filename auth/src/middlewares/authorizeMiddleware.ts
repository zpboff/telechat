import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { isNil } from "lodash";
import { configs } from "../configs";

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(isNil(authHeader)) {
       throw new Error('Пользователь не авторизован');
    }

    const [type, token] = authHeader?.split(' ');

    if(type !== "Bearer") {
        throw new Error('Некорректный токен');
    }

    const correct = verify(token, configs.secret);

    if(!correct) {
        throw new Error('Некорректный токен');
    }    

    console.log(correct);

    next();
}