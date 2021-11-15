import {isEmpty, isNil} from "lodash";
import {BaseErrorContainer} from "./exceptions/types";

export type Nullable<T> = T | null | undefined;

export type Result<TEntity, TErrors extends BaseErrorContainer> = {
    entity?: Nullable<TEntity>;
    errors?: Nullable<TErrors>;
}

export type HasId<T> = {
    id: T;
}

export function buildResult<TEntity, TErrors>(entity: Nullable<TEntity>): Result<TEntity, TErrors> {
    return {
        entity
    }
}

export function buildResultFromError<TEntity, TErrors>(errors: Nullable<TErrors>): Result<TEntity, TErrors> {
    return {
        errors
    }
}

export type Dict<T> = { [key: string]: T }

export function hasError<TEntity, TErrors>(result: Result<TEntity, TErrors>) {
    return !isEmpty(result.errors);
}

export function hasResult<TEntity, TErrors>(result: Result<TEntity, TErrors>) {
    return isEmpty(result.errors) && !isNil(result.entity);
}

