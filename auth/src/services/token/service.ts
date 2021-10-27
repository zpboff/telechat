import { sign } from "jsonwebtoken";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { configs } from "../../configs";
import {createToken, deleteToken, getTokenByEmail} from "../../stores/tokenStore";
import { isSuccess } from "../../types";
import { UserViewModel } from "../user";
import { TokenInfo } from "./types";

export async function generateTokens(payload: UserViewModel): Promise<TokenInfo> {
    const accessToken = sign(payload, configs.secret, {
        expiresIn: configs.refreshTokenLifeTime
    });
    const expirationDate = new Date(new Date().getTime() + configs.refreshTokenLifeTime);

    const result = await getTokenByEmail(payload.email);
    let refreshToken = result?.entity?.token;

    if(isEmpty(result.entity)) {
        refreshToken = v4();
        const createResult = await createToken(payload.email, refreshToken, expirationDate);

        if(!isSuccess(createResult)) {
            refreshToken = undefined;
        }
    }

    return {
        accessToken,
        refreshToken
    }
}

export const removeToken = async (email: string, token: string) => {
    const result = await deleteToken(email, token);

    return isEmpty(result.errors) && result.entity;
};