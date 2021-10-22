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

    static Unathorize() {
        return new ApiError(403, 'Пользователь не авторизован');
    }
}