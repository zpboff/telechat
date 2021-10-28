import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {AuthActionResult, BaseErrors} from "../types";
import {findUser, UserCreateModel, UserViewModel} from "../../user";
import {isNil} from "lodash";
import {hash} from "bcrypt";
import {configs} from "../../../configs";
import {createUser} from "../../../stores";
import {generateTokens} from "../../token/service";
import validator from 'validator';
import {withCatch} from "../../../exceptions/withCatch";

type RegistrationErrors = BaseErrors & {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
}

async function checkParams(user: UserCreateModel): Promise<Result<null>> {
    return await withCatch<null>(async () => {
        const errors: RegistrationErrors = {};
        const minPasswordLength = 6;

        if (isNil(user)) {
            errors.common = 'Модель не заполнена';
            return buildResultFromError(errors);
        }

        const {email, password, firstName, lastName} = user;

        if (validator.isEmpty(email)) {
            if (isNil(errors.email)) {
                errors.email = [];
            }

            errors.email.push(`Поле должно быть заполнено`);
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

        if (validator.isEmpty(firstName)) {
            if (isNil(errors.firstName)) {
                errors.firstName = [];
            }

            errors.firstName.push(`Поле должно быть заполнено`);
        }

        if (validator.isEmpty(lastName)) {
            if (isNil(errors.lastName)) {
                errors.lastName = [];
            }

            errors.lastName.push(`Поле должно быть заполнено`);
        }

        return buildResultFromError<null>(errors);
    });
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

async function checkUserCreated(user: UserCreateModel): Promise<Result<null>> {
    user.password = await hash(user.password, configs.saltRounds);

    const result = await createUser(user);

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

export async function registration(user: UserCreateModel): Promise<Result<AuthActionResult>> {
    const checkParamsResult = await checkParams(user);

    if (!isSuccess(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const existingUserCheckResult = await checkExistingUser(user.email);

    if (!isSuccess(existingUserCheckResult)) {
        return buildResultFromError(existingUserCheckResult.errors);
    }

    const userCreatedCheckResult = await checkUserCreated(user);

    if (!isSuccess(existingUserCheckResult)) {
        return buildResultFromError(userCreatedCheckResult.errors);
    }

    return await checkTokensCreated(user.email);
}