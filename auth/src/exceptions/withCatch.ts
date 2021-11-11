import {buildResultFromError, Result} from "../types";
import {BaseErrorContainer} from "./types";
import {logger} from "../services";

export async function withCatch<TResult>(callback: () => Promise<Result<TResult, BaseErrorContainer>>) {
    try {
        return await callback();
    } catch (err) {
        logger.error(err);

        const errors: BaseErrorContainer = {
            common: err.message
        }

        return buildResultFromError<TResult, BaseErrorContainer>(errors);
    }
}