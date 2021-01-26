import { NextFunction, Request, Response } from "express";
import { log } from "../logger";

export function logRequest(req: Request, res: Response, next: NextFunction) {
    log(req.url, req)
    next();
}