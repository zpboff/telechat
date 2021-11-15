import {BaseErrorContainer} from "../../exceptions/types";
import {buildResultFromError, Result} from "../../types";
import {withCatch} from "../../exceptions/withCatch";
import validator from "validator";

export type RelationErrorsContainer = BaseErrorContainer & {
    userLogin?: string;
    targetUserLogin?: string;
}

export async function checkRelationParams(userLogin: string, targetUserLogin: string): Promise<Result<null, BaseErrorContainer>> {
    return await withCatch<null>(async () => {
        const errors: RelationErrorsContainer = {};

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
