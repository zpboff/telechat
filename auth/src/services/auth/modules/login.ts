import {buildResult, buildResultFromError, hasError, Result} from "../../../types";
import {isNil} from "lodash";
import {compare} from "bcrypt";
import {mapUserEntityToUser, User} from "../../user";
import {generateTokens} from "../../token";
import {AuthActionResult} from "../types";
import {getUserByEmail, UserEntity} from "../../../stores";
import {BaseErrorContainer} from "../../../exceptions/types";

async function checkExistingUser(email: string): Promise<Result<UserEntity, BaseErrorContainer>> {
    const result = await getUserByEmail(email);

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

async function checkPassword(password: string, passwordHash: string = ""): Promise<Result<null, BaseErrorContainer>> {
    const passwordsMatch = await compare(password, passwordHash);

    if (!passwordsMatch) {
        const errors: BaseErrorContainer = {
            common: ['Пароли не совпадают']
        }

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

async function checkTokensCreated(userEntity: UserEntity): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const user = mapUserEntityToUser(userEntity);

    const result = await generateTokens(user as User);

    if (hasError(result)) {
        return buildResultFromError(result.errors);
    }

    const authResult: AuthActionResult = {
        accessToken: result.entity?.accessToken,
        refreshToken: result.entity?.refreshToken,
        user: user as User
    }

    return buildResult(authResult);
}

export async function login(email: string, password: string): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const checkExistingUserResult = await checkExistingUser(email);

    if (hasError(checkExistingUserResult)) {
        return buildResultFromError(checkExistingUserResult.errors);
    }

    const checkPasswordResult = await checkPassword(password, checkExistingUserResult.entity?.password);

    if (hasError(checkPasswordResult)) {
        return buildResultFromError(checkPasswordResult.errors);
    }

    return await checkTokensCreated(checkExistingUserResult.entity as UserEntity);
}