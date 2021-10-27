import {isEmpty, isNil} from "lodash";

export type Result<TEntity> = {
    entity: TEntity | null;
    errors: object;
}

export type HasId<T> = {
    id: T;
}

export function buildResult<TEntity>(entity: TEntity): Result<TEntity> {
    return {
        entity,
        errors: {}
    }
}

export function buildResultFromError<TEntity>(errors: object): Result<TEntity> {
    return {
        entity: null,
        errors
    }
}

export function isSuccess<TEntity>(result: Result<TEntity>) {
    return isEmpty(result.errors);
}

export function isCorrect<TEntity>(result: Result<TEntity>) {
    return isEmpty(result.errors) && !isNil(result.entity);
}

export type Dict<TValue> = { [key: string]: TValue }

