import {buildResult, buildResultFromError, hasError, hasResult, Nullable, Result} from "../../types";
import {getRelation, RelationEntity, RelationState} from "../../stores/relationsStore";
import {BaseErrorContainer} from "../../exceptions/types";
import {UserEntity} from "../../stores";
import {checkExistingUserByLogin} from "../checks";
import {checkRelationParams} from "./checkRelationParams";

export async function getRelationInfo(userLogin: string, targetUserLogin: string): Promise<Result<RelationEntity, BaseErrorContainer>> {
    const checkParamsResult = await checkRelationParams(userLogin, targetUserLogin);

    if (hasError(checkParamsResult)) {
        return buildResultFromError(checkParamsResult.errors);
    }

    const checkUserResult = await checkExistingUserByLogin(userLogin);

    if (!hasResult(checkUserResult)) {
        return buildResultFromError(checkUserResult.errors);
    }

    const checkTargetUserResult = await checkExistingUserByLogin(targetUserLogin);

    if (!hasResult(checkTargetUserResult)) {
        return buildResultFromError(checkTargetUserResult.errors);
    }

    const {id: userId} = checkUserResult.entity as UserEntity;
    const {id: targetUserId} = checkTargetUserResult.entity as UserEntity;

    return await getRelation(userId, targetUserId);
}