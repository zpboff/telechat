import { NextFunction, Request, Response } from "express";
import { OutgoingHttpHeaders } from "http";
import { logger } from "../services";

type ResponseLogPart = {
    statusCode: number;
    statusMessage: string;
    headers: OutgoingHttpHeaders;
}

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
    response: ResponseLogPart;
}

export async function loggerMiddleware(req: Request, res: Response, next: NextFunction) {
    const requestStart = Date.now();

    res.on('finish', () => {
        const { method, url, rawHeaders, cookies, ip, query, body, socket, baseUrl, originalUrl } = req;
        const { remoteFamily, remoteAddress, remotePort } = socket;

        const { statusCode, statusMessage } = res;
        const headers = res.getHeaders();
    
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
            originalUrl,
            response: {
                headers,
                statusCode,
                statusMessage
            }
        }
    
        logger.info(logEntity, `Request {url}`);
    })
    
    
    next();
}