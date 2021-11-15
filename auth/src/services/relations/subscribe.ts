import {getUserByLogin, UserEntity} from "../../stores";
import {buildResult, buildResultFromError, hasError, hasResult, Result} from "../../types";
import {isNil} from "lodash";
import {createFriendRequest, getRelation, UsersRelationsState} from "../../stores/usersRelations";
import {BaseErrorContainer} from "../../exceptions/types";
import {checkRelationParams, RelationErrorsContainer} from "./checkRelationParams";

type SubscribeErrorContainer = RelationErrorsContainer & {
    request?: string;
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
    const existingRequestResult = await getRelation(userId, targetUserId);

    if (hasError(existingRequestResult)) {
        return buildResultFromError(existingRequestResult.errors);
    }

    if (!isNil(existingRequestResult.entity)) {
        const errors: SubscribeErrorContainer = {
            request: 'Запрос уже существует'
        }

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

export async function subscribe(userLogin: string, targetUserLogin: string): Promise<Result<null, BaseErrorContainer>> {
    const checkParamsResult = await checkRelationParams(userLogin, targetUserLogin);

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

    const createRequestResult = await createFriendRequest(userId, targetUserId, UsersRelationsState.Subscribed);

    if (!hasResult(createRequestResult)) {
        return buildResultFromError(createRequestResult.errors);
    }

    return buildResult(null);
}