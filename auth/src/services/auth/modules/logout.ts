import {findUserByToken, User} from "../../user";
import {isNil} from "lodash";
import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {removeToken} from "../../token";
import {BaseErrors} from "../types";
import validator from "validator";
import {withCatch} from "../../../exceptions/withCatch";

async function checkToken(token: string): Promise<Result<null>> {
    return await withCatch(async () => {
        const isValid = !validator.isEmpty(token);

        if (!isValid) {
            const errors: BaseErrors = {
                common: 'Отсутствует токен'
            }

            return buildResultFromError(errors);
        }

        return buildResult(null);
    });
}

async function checkUser(token: string): Promise<Result<User>> {
    const user = await findUserByToken(token);

    if (isNil(user)) {
        const errors: BaseErrors = {
            common: 'Вы не авторизованы'
        }

        return buildResultFromError(errors);
    }

    return buildResult(user);
}

async function checkTokenDeleted(email: string, token: string) {
    return await removeToken(email, token);
}

export async function logout(token: string): Promise<Result<boolean>> {
    const checkTokenResult = await checkToken(token);

    if (!isSuccess(checkTokenResult)) {
        return buildResultFromError(checkTokenResult.errors);
    }

    const checkUserResult = await checkUser(token);

    if (!isSuccess(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const tokenDeletedResult = await checkTokenDeleted(checkUserResult.entity?.email as string, token);

    if (!isSuccess(tokenDeletedResult)) {
        return buildResultFromError(tokenDeletedResult.errors);
    }

    return buildResult(tokenDeletedResult.entity as number > 0);
}