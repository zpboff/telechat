import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {isNil} from "lodash";
import {compare} from "bcrypt";
import {mapUser, User} from "../../user";
import {generateTokens} from "../../token";
import {AuthActionResult, BaseErrors} from "../types";
import {getUserByEmail, UserEntity} from "../../../stores";

async function checkExistingUser(email: string): Promise<Result<UserEntity>> {
    const result = await getUserByEmail(email);

    if (!isSuccess(result)) {
        return buildResultFromError(result.errors);
    }

    if (isNil(result.entity)) {
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

async function checkTokensCreated(userEntity: UserEntity): Promise<Result<AuthActionResult>> {
    const user = mapUser(userEntity);

    const result = await generateTokens(user as User);

    if(!isSuccess(result)) {
        return buildResultFromError<AuthActionResult>(result.errors);
    }

    const authResult: AuthActionResult = {
        accessToken: result.entity?.accessToken,
        refreshToken: result.entity?.refreshToken,
        user: user as User
    }

    return buildResult(authResult);
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

    return await checkTokensCreated(checkExistingUserResult.entity as UserEntity);
}