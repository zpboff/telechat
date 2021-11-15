import {getUserByLogin, UserEntity} from "../../stores";
import {buildResult, buildResultFromError, hasError, hasResult, Result} from "../../types";
import {isNil} from "lodash";
import {createRelationState, getRelation, RelationState, createRelation} from "../../stores/relationsStore";
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

export async function checkRelation(userId: number, targetUserId: number, relationState: RelationState): Promise<Result<number, BaseErrorContainer>> {
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

    return buildResult(existingRequestResult.entity?.id);
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

    if (!hasResult(checkRequest)) {
        return await saveRelation(userId, targetUserId, relationState);
    }

    return await setRelationState(checkRequest.entity as number, userId, relationState);
}

async function saveRelation(userId: number, targetUserId: number, relationState: RelationState): Promise<Result<null, BaseErrorContainer>> {
    const createRelationResult = await createRelation(userId, targetUserId, relationState);

    if (hasError(createRelationResult)) {
        return buildResultFromError(createRelationResult.errors);
    }

    return buildResult(null);
}

async function setRelationState(relationshipId: number, userId: number, relationState: RelationState): Promise<Result<null, BaseErrorContainer>> {
    const createRelationResult = await createRelationState(relationshipId, userId, relationState);

    if (hasError(createRelationResult)) {
        return buildResultFromError(createRelationResult.errors);
    }

    return buildResult(null);
}