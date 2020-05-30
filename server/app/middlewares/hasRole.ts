import { Response, NextFunction } from "express";
import { RequestWithUser } from "./types";
import { UserRoles } from "telechat-auth/types/roles";

export const hasRole = (requiredRole: UserRoles) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        next();
        if (req.currentUser?.roles?.includes(requiredRole)) {
            return next();
        } else {
            return res.sendStatus(401);
        }
    };
};
