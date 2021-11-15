import {buildResult, buildResultFromError, hasError, Result} from "../../../types";
import {findUserByToken, User} from "../../user";
import {isNil} from "lodash";
import {generateTokens} from "../../token";
import {AuthActionResult} from "../types";
import {BaseErrorContainer} from "../../../exceptions/types";

async function checkUser(token: string): Promise<Result<User, BaseErrorContainer>> {
    const user = await findUserByToken(token);

    if (isNil(user)) {
        const errors: BaseErrorContainer = {
            common: ['Вы не авторизованы']
        }

        return buildResultFromError(errors);
    }

    return buildResult(user);
}

async function checkTokensCreated(user: User): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const result = await generateTokens(user);

    if(hasError(result)) {
        return buildResultFromError(result.errors);
    }

    const authResult: AuthActionResult = {
        accessToken: result.entity?.accessToken,
        refreshToken: result.entity?.refreshToken,
        user
    }

    return buildResult(authResult);
}

export async function refresh(token: string): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const checkUserResult = await checkUser(token);

    if (hasError(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    return await checkTokensCreated(checkUserResult.entity as User);
}