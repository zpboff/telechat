import {findUserByToken, UserViewModel} from "../../user";
import {isNil} from "lodash";
import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {removeToken} from "../../token/service";
import {BaseErrors} from "../types";
import validator from "validator";

function checkToken(token: string): Result<null> {
    try {
        const isValid = !validator.isEmpty(token);

        if(!isValid) {
            const errors: BaseErrors = {
                common: 'Отсутствует токен'
            }

            return buildResultFromError(errors);
        }

        return buildResult(null);
    }
    catch (err) {
        console.log(err);

        const errors: BaseErrors = {
            common: err.message
        }

        return buildResultFromError(errors);
    }
}

async function checkUser(token: string): Promise<Result<UserViewModel>> {
    const user = await findUserByToken(token);

    if(isNil(user)) {
        const errors: BaseErrors = {
            common: 'Вы не авторизованы'
        }

       return buildResultFromError(errors);
    }

    return buildResult(user);
}

async function checkTokenDeleted(email: string, token: string) {
    const result = await removeToken(email, token);

    return result;
}

export async function logout(token: string): Promise<Result<boolean>> {
    const checkTokenResult = checkToken(token);

    if(!isSuccess(checkTokenResult)) {
        return buildResultFromError(checkTokenResult.errors);
    }

    const checkUserResult = await checkUser(token);

    if(!isSuccess(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const tokenDeletedResult = await checkTokenDeleted(checkUserResult.entity?.email as string, token);

    if(!isSuccess(tokenDeletedResult)) {
        return buildResultFromError(tokenDeletedResult.errors);
    }

    return buildResult(tokenDeletedResult.entity as number > 0);
}