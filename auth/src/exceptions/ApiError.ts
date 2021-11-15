export class ApiError extends Error {
    status: number;
    errors: unknown;

    constructor(status: number, message: string, errors?: unknown) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static ServerError(errors: unknown) {
        return new ApiError(500, 'Ошибка сервера', errors)
    }

    static BadRequest(errors: unknown) {
        return new ApiError(400, 'Неправильный запрос', errors)
    }

    static Forbidden(errors?: unknown) {
        return new ApiError(403, 'Пользователь не авторизован', errors);
    }

    static Unauthorized(errors: unknown) {
        return new ApiError(401, 'Ошибка авторизации', errors);
    }

    static NotAvailable() {
        return new ApiError(503, 'Сайт недоступен');
    }
}