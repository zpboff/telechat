import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {getUser, User} from "../../../stores";
import {isNil} from "lodash";
import {compare} from "bcrypt";
import {mapUser, UserViewModel} from "../../user";
import {generateTokens} from "../../token/service";
import {AuthActionResult, BaseErrors} from "../types";

async function checkExistingUser(email: string): Promise<Result<User>> {
    const result = await getUser(email);

    if(!isSuccess(result)) {
        return buildResultFromError(result.errors);
    }

    if(isNil(result.entity)) {
        const errors: BaseErrors = {
            common: 'Пользователь не найден'
        }

        return buildResultFromError(errors);
    }

    return result;
}

async function checkPassword(password: string, passwordHash: string = ""): Promise<Result<null>> {
    const passwordsMatch = await compare(password, passwordHash);

    if (!passwordsMatch) {
        const errors: BaseErrors = {
            common: 'Пароли не совпадают'
        }

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

async function checkTokensCreated(userEntity: User): Promise<Result<AuthActionResult>> {
    const user = mapUser(userEntity);

    const result = await generateTokens(user);

    return isSuccess(result)
        ? buildResult({
            accessToken: result.entity?.accessToken,
            refreshToken: result.entity?.refreshToken,
            user
        }) : buildResultFromError(result.errors);
}

export async function login(email: string, password: string): Promise<Result<AuthActionResult>> {
    const checkExistingUserResult = await checkExistingUser(email);

    if (!isSuccess(checkExistingUserResult)) {
        return buildResultFromError(checkExistingUserResult.errors);
    }

    const checkPasswordResult = await checkPassword(password, checkExistingUserResult.entity?.password);

    if (!isSuccess(checkPasswordResult)) {
        return buildResultFromError(checkPasswordResult.errors);
    }

    return await checkTokensCreated(checkExistingUserResult.entity as User);
}