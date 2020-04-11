import { getUserById } from "../../../db/repositories/userRepository";
import { Response, NextFunction } from "express";
import { RequestWithToken } from "./Types";

const withUser = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    const { id } = req.token.data;

    const userRecord = await getUserById(id);

    if (!userRecord) {
        return res.status(401).end("User not found");
    }
    
    req.currentUser = userRecord;
    next();
};

module.exports = withUser;
