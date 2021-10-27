import {buildResult, buildResultFromError, isCorrect, isSuccess, Result} from "../../../types";
import {AuthActionResult, BaseErrors} from "../types";
import {findUser, UserViewModel} from "../../user";
import {isEmpty, isNil} from "lodash";
import {hash} from "bcrypt";
import {configs} from "../../../configs";
import {createUser} from "../../../stores";
import {generateTokens} from "../../token/service";
import validator from 'validator';

type RegistrationErrors = BaseErrors & {
    email?: string[];
    password?: string[];
}

async function checkParams(email: string, password: string): Promise<Result<null>> {
    const errors: RegistrationErrors = {};
    const minPasswordLength = 6;

    if (validator.isEmpty(email)) {
        if (isNil(errors.email)) {
            errors.email = [];
        }

        errors.email.push('Поле email должно быть заполнено');
    }

    if (!validator.isEmail(email)) {
        if (isNil(errors.email)) {
            errors.email = [];
        }

        errors.email.push('Введите корректный email');
    }

    if (!validator.isLength(password, {min: minPasswordLength})) {
        if (isNil(errors.password)) {
            errors.password = [];
        }

        errors.password.push(`Пароль должен содержать больше ${minPasswordLength}-ти символов`);
    }

    return buildResultFromError(errors);
}

async function checkExistingUser(email: string): Promise<Result<null>> {
    const user = await findUser(email);

    if (!isNil(user)) {
        const errors: BaseErrors = {
            common: "Пользователь с таким email уже существует"
        };

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

async function checkUserCreated(email: string, password: string): Promise<Result<null>> {
    const passwordHash = await hash(password, configs.saltRounds);

    const result = await createUser(email, passwordHash);

    return isSuccess(result)
        ? buildResult(null)
        : buildResultFromError(result.errors)
}

async function checkTokensCreated(email: string): Promise<Result<AuthActionResult>> {
    const user: UserViewModel = {
        email
    }

    const result = await generateTokens(user);

    return isSuccess(result)
        ? buildResult({
            accessToken: result.entity?.accessToken,
            refreshToken: result.entity?.refreshToken,
            user
        }) : buildResultFromError(result.errors);
}

export async function registration(email: string, password: string): Promise<Result<AuthActionResult>> {
    const checkParamsResult = await checkParams(email, password);

    if (!isSuccess(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const existingUserCheckResult = await checkExistingUser(email);

    if (!isSuccess(existingUserCheckResult)) {
        return buildResultFromError(existingUserCheckResult.errors);
    }

    const userCreatedCheckResult = await checkUserCreated(email, password);

    if (!isSuccess(existingUserCheckResult)) {
        return buildResultFromError(userCreatedCheckResult.errors);
    }

    return await checkTokensCreated(email);
}