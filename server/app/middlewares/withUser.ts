import { Response, NextFunction } from "express";
import { RequestWithToken } from "./types";
import { getUserById } from "providers/usersProvider";

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
