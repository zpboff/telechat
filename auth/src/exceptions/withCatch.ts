import {buildResultFromError, Result} from "../types";
import {BaseErrors} from "../services";

export async function withCatch<T>(callback: () => Promise<Result<T>>) {
    try {
        return await callback();
    }
    catch (err) {
        console.log(err);

        const errors: BaseErrors = {
            common: err.message
        }

        return buildResultFromError<T>(errors);
    }
}