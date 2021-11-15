import {NextFunction, Request, Response} from "express";
import {ApiError} from "../exceptions/ApiError";
import {logger} from "../services";
import {BaseErrorContainer} from "../exceptions/types";

export function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
    logger.error(err, req, res);

    if (err instanceof ApiError) {
        return res.status(err.status).json({errors: err.errors});
    }

    const errors: BaseErrorContainer = {
        common: ['Ошибка сервера']
    }

    return res.status(500).json({errors});
}