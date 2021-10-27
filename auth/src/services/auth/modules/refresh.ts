import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {findUserByToken, UserViewModel} from "../../user";
import {isNil} from "lodash";
import {generateTokens} from "../../token/service";
import {AuthActionResult, BaseErrors} from "../types";

async function checkUser(token: string): Promise<Result<UserViewModel>> {
    const user = await findUserByToken(token);

    if (isNil(user)) {
        const errors: BaseErrors = {
            common: 'Вы не авторизованы'
        }

        return buildResultFromError(errors);
    }

    return buildResult(user);
}

async function checkTokensCreated(user: UserViewModel): Promise<Result<AuthActionResult>> {
    const result = await generateTokens(user);

    return isSuccess(result)
        ? buildResult({
            accessToken: result.entity?.accessToken,
            refreshToken: result.entity?.refreshToken,
            user
        }) : buildResultFromError(result.errors);
}

export async function refresh(token: string): Promise<Result<AuthActionResult>> {
    const checkUserResult = await checkUser(token);

    if (!isSuccess(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    return await checkTokensCreated(checkUserResult.entity as UserViewModel);
}