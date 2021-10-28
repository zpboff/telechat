import {buildResult, buildResultFromError, isSuccess, Result} from "../../../types";
import {AuthActionResult, BaseErrors} from "../types";
import {findUserByEmail, mapUser, User, UserCreateModel} from "../../user";
import {isNil, map} from "lodash";
import {hash} from "bcrypt";
import {configs} from "../../../configs";
import {createUser, UserEntity} from "../../../stores";
import {generateTokens} from "../../token";
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
    const user = await findUserByEmail(email);

    if (!isNil(user)) {
        const errors: BaseErrors = {
            common: "Пользователь с таким email уже существует"
        };

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

async function checkUserCreated(userCreateModel: UserCreateModel): Promise<Result<User>> {
    userCreateModel.password = await hash(userCreateModel.password, configs.saltRounds);

    const userEntityResult = await createUser(userCreateModel);
    const user = mapUser(userEntityResult.entity as UserEntity);

    return buildResult(user as User);
}

async function checkTokensCreated(user: User): Promise<Result<AuthActionResult>> {
    const result = await generateTokens(user);

    if (!isSuccess(result)) {
        return buildResultFromError(result.errors);
    }

    const authResult: AuthActionResult = {
        accessToken: result.entity?.accessToken,
        refreshToken: result.entity?.refreshToken,
        user
    }

    return buildResult(authResult);
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

    return await checkTokensCreated(userCreatedCheckResult.entity as User);
}