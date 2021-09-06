import { NextFunction, Request, Response } from "express";
import { method } from "lodash";
import { logger } from "../services";

type LogEntity = {
    timestamp: Date;
    method: string;
    url: string;
    baseUrl: string;
    originalUrl: string;
    rawHeaders: string[];
    cookies: any;
    ip: string;
    query: any;
    body: any;
    remoteAddress: string | undefined;
    remoteFamily: string | undefined;
    remotePort: number | undefined;
    processingTime: number;
}

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const requestStart = Date.now();

    res.on('finish', () => {
        const { method, url, rawHeaders, cookies, ip, query, body, socket, baseUrl, originalUrl } = req;
        const { remoteFamily, remoteAddress, remotePort } = socket;
    
        const logEntity: LogEntity = {
            timestamp: new Date(),
            processingTime: Date.now() - requestStart,
            method,
            body, 
            cookies,
            ip,
            query,
            rawHeaders,
            url,
            remoteAddress,
            remoteFamily, 
            remotePort,
            baseUrl,
            originalUrl
        }
    
        logger.info(logEntity, `Request {url}`);
    })
    
    
    next();
}