import {NextFunction, Request, Response} from "express";
import {getSiteStatus} from "../stores/siteStatusStore";
import {hasResult} from "../types";
import {ApiError} from "../exceptions/ApiError";

export async function siteIsWorkingMiddleware(req: Request, res: Response, next: NextFunction) {
    const status = await getSiteStatus();

    if(!hasResult(status) || !status.entity?.siteaccessible) {
        next(ApiError.NotAvailable());
    }

    next();
}