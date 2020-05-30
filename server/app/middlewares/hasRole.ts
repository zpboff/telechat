import { Response, NextFunction } from "express";
import { RequestWithUser } from "./Types";

export const hasRole = (requiredRole: string) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        next();
        if (req.currentUser?.email === requiredRole) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    };
};
