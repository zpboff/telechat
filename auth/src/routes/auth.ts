import {NextFunction, Response, Router} from 'express';
import {configs} from '../configs';
import {ApiError} from '../exceptions/ApiError';
import {authorizeMiddleware} from '../middlewares/authorizeMiddleware';
import {AuthActionResult, login, logout, refresh, registration} from '../services';
import {isCorrect, Result} from '../types';

const authRouter = Router();

authRouter.post('/registration', async (req, res, next) => {
    const result = await registration(req.body.email, req.body.password);

    if (!isCorrect(result)) {
        return next(ApiError.Unauthorized(result.errors));
    }

    return authenticate(result, res, next);
});

authRouter.post('/login', async (req, res, next) => {
    const result = await login(req.body.email, req.body.password);

    return authenticate(result, res, next);
});

authRouter.get('/logout', authorizeMiddleware, async (req, res, next) => {
    const {refreshToken} = req.cookies;

    const isSuccess = await logout(refreshToken);

    setRefreshTokenCookie(res, refreshToken, new Date(new Date().getTime() - 1));

    if (!isSuccess) {
        return next(ApiError.BadRequest(['Произошла ошибка']));
    }

    return res.status(200).send();
});

authRouter.get('/check', authorizeMiddleware, async (_, res) => {
    return res.json();
});

authRouter.get('/refresh', async (req, res, next) => {
    const {refreshToken} = req.cookies;

    if (!refreshToken) {
        return next(ApiError.Forbidden());
    }

    const result = await refresh(refreshToken);

    return authenticate(result, res, next);
});


function authenticate(result: Result<AuthActionResult>, res: Response, next: NextFunction) {
    if (!isCorrect(result)) {
        return next(ApiError.Forbidden(result.errors));
    }

    const {accessToken, refreshToken, user} = result.entity as AuthActionResult;

    setRefreshTokenCookie(res, refreshToken, new Date(new Date().getTime() + configs.refreshTokenLifeTime));

    return res.json({accessToken, user});
}

function setRefreshTokenCookie(res: Response, refreshToken: string | undefined, expires: Date) {
    res.cookie('refreshToken', refreshToken, {
        expires,
        domain: configs.cookieDomain,
        httpOnly: true
    });
}

export {authRouter}