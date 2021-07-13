import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { isNil } from "lodash";
import { configs } from "../configs";

export async function authorize(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if(isNil(authHeader)) {
       return res.status(401).json();
    }

    const [type, token] = authHeader?.split(' ');

    if(type !== "Bearer") {
        return res.status(401).json();
    }

    const correct = verify(token, configs.secret);

    if(!correct) {
        return res.status(401).json();
    }    

    console.log(correct);

    next();
}