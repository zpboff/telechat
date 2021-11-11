import {findUserByToken, User} from "../../user";
import {isNil} from "lodash";
import {buildResult, buildResultFromError, hasError, Result} from "../../../types";
import {removeToken} from "../../token";
import validator from "validator";
import {withCatch} from "../../../exceptions/withCatch";
import {BaseErrorContainer} from "../../../exceptions/types";

async function checkToken(token: string): Promise<Result<null, BaseErrorContainer>> {
    return await withCatch(async () => {
        const isValid = !validator.isEmpty(token);

        if (!isValid) {
            const errors: BaseErrorContainer = {
                common: ['Отсутствует токен']
            }

            return buildResultFromError(errors);
        }

        return buildResult(null);
    });
}

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

async function checkTokenDeleted(email: string, token: string) {
    return await removeToken(email, token);
}

export async function logout(token: string): Promise<Result<boolean, BaseErrorContainer>> {
    const checkTokenResult = await checkToken(token);

    if (hasError(checkTokenResult)) {
        return buildResultFromError(checkTokenResult.errors);
    }

    const checkUserResult = await checkUser(token);

    if (hasError(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const tokenDeletedResult = await checkTokenDeleted(checkUserResult.entity?.email as string, token);

    if (hasError(tokenDeletedResult)) {
        return buildResultFromError(tokenDeletedResult.errors);
    }

    return buildResult(tokenDeletedResult.entity as number > 0);
}