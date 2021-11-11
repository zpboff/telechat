import {getUserByLogin, UserEntity} from "../../stores";
import {buildResult, buildResultFromError, hasResult, hasError, Result} from "../../types";
import {isNil} from "lodash";
import {createFriendRequest, getRequest, UsersRelationsEntity} from "../../stores/usersRelations";
import {withCatch} from "../../exceptions/withCatch";
import validator from 'validator';
import {BaseErrorContainer} from "../../exceptions/types";

type CreateFriendRequestErrors = BaseErrorContainer & {
    userLogin?: string;
    targetUserLogin?: string;
    request?: string;
}

async function checkParams(userLogin: string, targetUserLogin: string): Promise<Result<null, BaseErrorContainer>> {
    return await withCatch<null>(async () => {
        const errors: CreateFriendRequestErrors = {};

        if (validator.isEmpty(userLogin)) {
            errors.userLogin = 'Логин пользователя не указан';
        }

        if (validator.isEmpty(targetUserLogin)) {
            errors.targetUserLogin = 'Логин пользователя не указан'
        }

        if (userLogin === targetUserLogin) {
            errors.common = ["Логины совпадают"];
        }

        return buildResultFromError(errors);
    });
}

async function checkExistingUser(login: string): Promise<Result<UserEntity, BaseErrorContainer>> {
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

export async function checkFriendRequest(userId: number, targetUserId: number): Promise<Result<null, BaseErrorContainer>> {
    const existingRequestResult = await getRequest(userId, targetUserId);

    if (hasError(existingRequestResult)) {
        return buildResultFromError(existingRequestResult.errors);
    }

    if (!isNil(existingRequestResult.entity)) {
        const errors: CreateFriendRequestErrors = {
            request: 'Запрос уже существует'
        }

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

export async function sendFriendRequest(userLogin: string, targetUserLogin: string): Promise<Result<null, BaseErrorContainer>> {
    const checkParamsResult = await checkParams(userLogin, targetUserLogin);

    if (hasError(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const checkUserResult = await checkExistingUser(userLogin);

    if (!hasResult(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const checkTargetUserResult = await checkExistingUser(targetUserLogin);

    if (!hasResult(checkUserResult)) {
        return buildResultFromError(checkTargetUserResult.errors);
    }

    const {id: userId} = checkUserResult.entity as UserEntity;
    const {id: targetUserId} = checkTargetUserResult.entity as UserEntity;

    const checkRequest = await checkFriendRequest(userId, targetUserId);

    if (hasError(checkRequest)) {
        return buildResultFromError(checkRequest.errors);
    }

    const createRequestResult = await createFriendRequest(userId, targetUserId);

    if (!hasResult(createRequestResult)) {
        return buildResultFromError(createRequestResult.errors);
    }

    return buildResult(null);
}

export async function getFriendRequestInfo(userLogin: string, targetUserLogin: string): Promise<Result<UsersRelationsEntity, BaseErrorContainer>> {
    const checkParamsResult = await checkParams(userLogin, targetUserLogin);

    if (hasError(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const checkUserResult = await checkExistingUser(userLogin);

    if (hasResult(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const checkTargetUserResult = await checkExistingUser(targetUserLogin);

    if (hasResult(checkUserResult)) {
        return buildResultFromError(checkTargetUserResult.errors);
    }

    const {id: userId} = checkUserResult.entity as UserEntity;
    const {id: targetUserId} = checkTargetUserResult.entity as UserEntity;

    return await getRequest(userId, targetUserId);
}