import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { isNil } from "lodash";
import { configs } from "../configs";
import { ApiError } from "../exceptions/ApiError";

export async function authorizeMiddleware(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization ?? "";

    if(!authHeader) {
        next(ApiError.Forbidden());
    }

    const [type, token] = authHeader.split(' ');

    if(type !== "Bearer") {
        next(ApiError.Forbidden())
    }

    try {
        const decodedUser = verify(token, configs.secret);

        if(isNil(decodedUser)) {
            next(ApiError.Forbidden())
        }    
        
        next();
    }
    catch(ex) {
        next(ApiError.Forbidden())
    }
}