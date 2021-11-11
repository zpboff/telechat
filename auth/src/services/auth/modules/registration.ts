import {buildResult, buildResultFromError, hasError, Result} from "../../../types";
import {AuthActionResult} from "../types";
import {findUserByEmail, mapUserEntityToUser, User, UserCreateModel} from "../../user";
import {isNil} from "lodash";
import {hash} from "bcrypt";
import {configs} from "../../../configs";
import {createUser, UserEntity} from "../../../stores";
import {generateTokens} from "../../token";
import validator from 'validator';
import {withCatch} from "../../../exceptions/withCatch";
import {BaseErrorContainer} from "../../../exceptions/types";

type RegistrationErrors = BaseErrorContainer & {
    email?: string[];
    password?: string[];
    firstName?: string[];
    lastName?: string[];
}

async function checkParams(user: UserCreateModel): Promise<Result<null, BaseErrorContainer>> {
    return await withCatch(async () => {
        const errors: RegistrationErrors = {};
        const minPasswordLength = 6;

        if (isNil(user)) {
            errors.common = ['Модель не заполнена'];
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

        return buildResultFromError(errors);
    });
}

async function checkExistingUser(email: string): Promise<Result<null, BaseErrorContainer>> {
    const user = await findUserByEmail(email);

    if (!isNil(user)) {
        const errors: BaseErrorContainer = {
            common: ["Пользователь с таким email уже существует"]
        };

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

async function checkUserCreated(userCreateModel: UserCreateModel): Promise<Result<User, BaseErrorContainer>> {
    userCreateModel.password = await hash(userCreateModel.password, configs.saltRounds);

    const userEntityResult = await createUser(userCreateModel);
    const user = mapUserEntityToUser(userEntityResult.entity as UserEntity);

    return buildResult(user as User);
}

async function checkTokensCreated(user: User): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const result = await generateTokens(user);

    if (hasError(result)) {
        return buildResultFromError(result.errors);
    }

    const authResult: AuthActionResult = {
        accessToken: result.entity?.accessToken,
        refreshToken: result.entity?.refreshToken,
        user
    }

    return buildResult(authResult);
}

export async function registration(user: UserCreateModel): Promise<Result<AuthActionResult, BaseErrorContainer>> {
    const checkParamsResult = await checkParams(user);

    if (hasError(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const existingUserCheckResult = await checkExistingUser(user.email);

    if (hasError(existingUserCheckResult)) {
        return buildResultFromError(existingUserCheckResult.errors);
    }

    const userCreatedCheckResult = await checkUserCreated(user);

    if (hasError(existingUserCheckResult)) {
        return buildResultFromError(userCreatedCheckResult.errors);
    }

    return await checkTokensCreated(userCreatedCheckResult.entity as User);
}