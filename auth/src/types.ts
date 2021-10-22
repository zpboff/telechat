import { isEmpty, isNil } from "lodash";

export type Result<T> = {
    entity: T | null;
    errors: string[];
}

export type HasId<T> = {
    id: T;
}

export function buildResult<T>(entity: T): Result<T> {
    return {
        entity,
        errors: []
    }
}

export function buildResultFromError<T>(errors: string[]): Result<T> {
    return {
        entity: null,
        errors
    }
}

export function isSuccess<T>(result: Result<T>){
    return isEmpty(result.errors);
}

export function isCorrect<T>(result: Result<T>) {
    return isEmpty(result.errors) && !isNil(result.entity);
}


