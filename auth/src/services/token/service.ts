import { sign } from "jsonwebtoken";
import { isEmpty } from "lodash";
import { v4 } from "uuid";
import { configs } from "../../configs";
import { createToken, getTokenByEmail } from "../../stores/tokenStore";
import { isSuccess } from "../../types";
import { UserViewModel } from "../user";
import { TokenInfo } from "./types";

export async function generateTokens(payload: UserViewModel): Promise<TokenInfo> {    
    const accessToken = sign(payload, configs.secret, {
        expiresIn: configs.lifeTime
    });

    const result = await getTokenByEmail(payload.email);
    let refreshToken = result?.entity?.token;

    if(isEmpty(result.entity)) {
        refreshToken = v4();
        const createResult = await createToken(payload.email, refreshToken, configs.lifeTime);

        if(!isSuccess(createResult)) {
            refreshToken = undefined;
        }
    }

    return {
        accessToken,
        refreshToken
    }
}