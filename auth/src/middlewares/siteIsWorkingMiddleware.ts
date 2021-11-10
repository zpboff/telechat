import {NextFunction, Request, Response} from "express";
import {getSiteStatus} from "../stores/siteStatusStore";
import {isCorrect} from "../types";

export async function siteIsWorkingMiddleware(req: Request, res: Response, next: NextFunction) {
    const status = await getSiteStatus();

    if(!isCorrect(status) || !status.entity?.siteaccessible) {
        return res.status(503).send();
    }

    next();
}