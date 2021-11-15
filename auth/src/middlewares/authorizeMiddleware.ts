import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {isNil} from "lodash";
import {configs} from "../configs";
import {ApiError} from "../exceptions/ApiError";
import {BaseErrorContainer} from "../exceptions/types";
import {UserPayload} from "../routes/auth/types";

export async function authorizeMiddleware(req: Request, _res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization ?? "";

    if (!authHeader) {
        next(ApiError.Forbidden());
    }

    const [type, token] = authHeader.split(' ');

    if (type !== "Bearer") {
        next(ApiError.Forbidden())
    }

    try {
        const decodedUser = verify(token, configs.secret);

        if (isNil(decodedUser)) {
            next(ApiError.Forbidden())
        }

        req.user = decodedUser as UserPayload;
        next();
    } catch (ex) {
        const errors: BaseErrorContainer = {
            common: [ex.message]
        }
        next(ApiError.Unauthorized(errors))
    }
}