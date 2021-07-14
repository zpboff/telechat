import { NextFunction, Request, Response } from "express";
import { ApiError } from "../exceptions/ApiError";

export async function errorMiddleware(err: any, _req: Request, res: Response, _next: NextFunction) {
    console.log(err);

    if(err instanceof ApiError) {
        return res.status(err.status).json({ errors: err.errors, message: err.message });
    }

    return res.status(500).json({ message: 'Серверная ошибка' });
}