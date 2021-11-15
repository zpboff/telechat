import {buildResultFromError, hasError, Result} from "../../types";
import {getUserByLogin, UserEntity} from "../../stores";
import {BaseErrorContainer} from "../../exceptions/types";
import {isNil} from "lodash";

export async function checkExistingUserByLogin(login: string): Promise<Result<UserEntity, BaseErrorContainer>> {
    const result = await getUserByLogin(login);

    if (hasError(result)) {
        return buildResultFromError(result.errors);
    }

    if (isNil(result.entity)) {
        const errors: BaseErrorContainer = {
            common: ['Пользователь не найден']
        }

        return buildResultFromError(errors);
    }

    return result;
}