import {getUserByLogin, UserEntity} from "../../stores";
import {buildResult, buildResultFromError, hasError, hasResult, Result} from "../../types";
import {isNil} from "lodash";
import {updateRelationState, getRelation, RelationState} from "../../stores/relationsStore";
import {BaseErrorContainer} from "../../exceptions/types";
import {checkRelationParams, RelationErrorsContainer} from "./checkRelationParams";

type RelationErrorContainer = RelationErrorsContainer & {
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

export async function checkRelation(userId: number, targetUserId: number, relationState: RelationState): Promise<Result<null, BaseErrorContainer>> {
    const existingRequestResult = await getRelation(userId, targetUserId);

    if (hasError(existingRequestResult)) {
        return buildResultFromError(existingRequestResult.errors);
    }

    if (existingRequestResult.entity?.state === relationState) {
        const errors: RelationErrorContainer = {
            request: 'Некорректные параметры'
        }

        return buildResultFromError(errors);
    }

    return buildResult(null);
}

export async function setRelation(userLogin: string, targetUserLogin: string, relationState: RelationState): Promise<Result<null, BaseErrorContainer>> {
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

    const checkRequest = await checkRelation(userId, targetUserId, relationState);

    if (hasError(checkRequest)) {
        return buildResultFromError(checkRequest.errors);
    }

    const createRequestResult = await updateRelationState(userId, targetUserId, relationState);

    if (!hasResult(createRequestResult)) {
        return buildResultFromError(createRequestResult.errors);
    }

    return buildResult(null);
}