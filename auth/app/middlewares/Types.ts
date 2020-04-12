import { Request } from "express";
import { IUser } from "telechat-db";
import { Nullable } from "Types";

export type RequestWithUser = Request & {
    currentUser: Nullable<IUser>;
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
