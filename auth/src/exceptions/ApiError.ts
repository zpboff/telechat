import { error } from "console";

export class ApiError extends Error {
    status: number;
    errors: string[];

    constructor(status: number, message: string, errors: string[] = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(errors: string[]) {
        return new ApiError(400, 'Неправильный запрос', errors)
    }

    static Forbidden(errors: string[] = []) {
        return new ApiError(403, 'Пользователь не авторизован', errors);
    }

    static Unauthorized(errors: string[] = []) {
        return new ApiError(401, 'Ошибка авторизации', errors);
    }
}