import { Response, NextFunction } from "express";
import { RequestWithToken } from "./Types";
import { userRepository } from '@telechat/db'

const withUser = async (req: RequestWithToken, res: Response, next: NextFunction) => {
    const { id } = req.token.data;

    const userRecord = await userRepository.getUserById(id);

    if (!userRecord) {
        return res.status(401).end("User not found");
    }
    
    req.currentUser = userRecord;
    next();
};

module.exports = withUser;
