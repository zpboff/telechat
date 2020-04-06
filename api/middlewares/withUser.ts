import { getUserById } from "../../db/repositories/userRepository";
import { Response, NextFunction } from "express";
import { RequestWithToken } from "./Types";

const withUser = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    const { id } = req.token.data;

    const userRecord = await getUserById(id);

    req.currentUser = userRecord;

    if (!userRecord) {
        return res.status(401).end("User not found");
    }

    next();
};

module.exports = withUser;
