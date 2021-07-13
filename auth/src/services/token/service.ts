import { sign } from "jsonwebtoken";
import { v4 } from "uuid";
import { configs } from "../../configs";
import { getToken } from "../../stores/tokenStore";
import { UserViewModel } from "../user";
import { TokenInfo } from "./types";

export async function generateTokens(payload: UserViewModel): Promise<TokenInfo> {    
    const accessToken = sign(payload, configs.secret, {
        expiresIn: configs.expiresIn
    });

    const result = await getToken(payload.email);
    const refreshToken = result?.entity?.token ?? v4();

    return {
        accessToken,
        refreshToken
    }
}