import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/ApiError";
import { logger } from "../services/logger";

export async function errorMiddleware(err: Error, req: Request, res: Response, _next: NextFunction) {
    logger.info(err, req, res);

    if(err instanceof ApiError) {
        return res.status(err.status).json({ errors: err.errors, message: err.message });
    }

    return res.status(500).json({ message: 'Серверная ошибка' });
}