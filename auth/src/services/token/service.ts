import {sign} from "jsonwebtoken";
import {isEmpty} from "lodash";
import {v4} from "uuid";
import {configs} from "../../configs";
import {createToken, deleteToken, getTokenByUser} from "../../stores/tokenStore";
import {buildResult, buildResultFromError, isSuccess, Result} from "../../types";
import {User} from "../user";
import {TokenInfo} from "./types";
import {BaseErrors} from "../auth";

async function checkAccessTokenCreated(user: User): Promise<Result<string>> {
    const accessToken = sign(user, configs.secret, {
        expiresIn: configs.refreshTokenLifeTime
    });

    if (isEmpty(accessToken)) {
        const errors: BaseErrors = {
            common: 'Ошибка при создании access-токена'
        }

        return buildResultFromError(errors);
    }

    return buildResult(accessToken);
}

async function checkRefreshTokenCreated(userId: number) {
    const expirationDate = new Date(new Date().getTime() + configs.refreshTokenLifeTime);

    const getTokenResult = await getTokenByUser(userId);

    if (!isSuccess(getTokenResult)) {
        return buildResultFromError(getTokenResult.errors);
    }

    let refreshToken = getTokenResult?.entity?.token;

    if (isEmpty(getTokenResult.entity)) {
        refreshToken = v4();
        const createResult = await createToken(userId, refreshToken, expirationDate);

        if (!isSuccess(createResult)) {
            refreshToken = undefined;
        }
    }

    if (isEmpty(refreshToken)) {
        const errors: BaseErrors = {
            common: 'Ошибка при создании refresh-токена'
        }

        return buildResultFromError(errors);
    }

    return buildResult(refreshToken);
}

export async function generateTokens(user: User): Promise<Result<TokenInfo>> {
    const checkAccessTokenCreatedResult = await checkAccessTokenCreated(user);

    if (!isSuccess(checkAccessTokenCreatedResult)) {
        return buildResultFromError(checkAccessTokenCreatedResult.errors);
    }

    const checkRefreshTokenCreatedResult = await checkRefreshTokenCreated(user.id);

    if (!isSuccess(checkRefreshTokenCreatedResult)) {
        return buildResultFromError(checkRefreshTokenCreatedResult.errors);
    }

    const tokenInfo: TokenInfo = {
        accessToken: checkAccessTokenCreatedResult.entity as string,
        refreshToken: checkRefreshTokenCreatedResult.entity as string
    }

    return buildResult(tokenInfo);
}

export const removeToken = async (email: string, token: string) => {
    return await deleteToken(email, token);
};