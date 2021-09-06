import { NextFunction, Request, Response } from "express";
import { method } from "lodash";
import { logger } from "../services";

type LogEntity = {
    method: string;
    url: string;
    rawHeaders: string[];
    cookies: any;
    ip: string;
    query: any;
    body: any;
}

export async function loggerMiddleware(req: Request, _res: Response, next: NextFunction) {
    const { method, url, rawHeaders, cookies, ip, query, body } = req;
    const logEntity: LogEntity = {
        method,
        body, 
        cookies,
        ip,
        query,
        rawHeaders,
        url
    }

    logger.info(logEntity, `Request {url}`);
    
    next();
}