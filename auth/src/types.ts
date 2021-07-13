import { isEmpty } from "lodash";

export type Result<T> = {
    entity?: T;
    errors?: string[];
}

export function isSuccess<T>(result: Result<T>){
    return isEmpty(result.errors);
} ;
