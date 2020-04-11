import { Response, NextFunction } from "express";
import { RequestWithUser } from "./Types";

export const hasRole = (requiredRole: string) => {
    return (req: RequestWithUser, res: Response, next: NextFunction) => {
        
        next();
        // if (req.currentUser.role === requiredRole) {
        //     return next();
        // } else {
        //     return res.status(401).send("Action not allowed");
        // }
    };
};
