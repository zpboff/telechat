import { Request } from "express";
import { IUser } from "../../db/dataModel/Types";

export type RequestWithUser = Request & {
    currentUser: IUser | null;
};

export type TokenData = {
    id: string;
};

export type TokenType = {
    data: TokenData;
};

export type RequestWithToken = RequestWithUser & {
    token: TokenType;
};
