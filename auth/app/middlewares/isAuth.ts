import { secret, tokenType } from "../constants/appSettings";
import { Request } from "express";
import jwt from "express-jwt";

const getTokenFromHeader = (req: Request) => {
    if (req.headers.authorization) {
        const [typeFromHeader, token] = req.headers.authorization.split(" ");

        if (typeFromHeader === tokenType) {
            return token;
        }
    }

    return "";
};

const isAuth = jwt({
    secret: secret,
    userProperty: "token",
    getToken: getTokenFromHeader
});

export { isAuth };
