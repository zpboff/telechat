import {NextFunction, Response, Router} from 'express';
import {configs} from '../../configs';
import {ApiError} from '../../exceptions/ApiError';
import {authorizeMiddleware} from '../../middlewares';
import {AuthActionResult, login, logout, refresh, registration} from '../../services';
import {hasError, hasResult, Result} from '../../types';
import {AuthenticateResponse} from "./types";
import {mapUserToUserPayload} from "./mapUserToUserPayload";
import {BaseErrorContainer} from "../../exceptions/types";

const authRouter = Router();

authRouter.post('/registration', async (req, res, next) => {
    const result = await registration(req.body);

    if (!hasResult(result)) {
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

    const logoutResult = await logout(refreshToken);

    setRefreshTokenCookie(res, refreshToken, new Date(new Date().getTime() - 1));

    if (hasError(logoutResult)) {
        return next(ApiError.BadRequest(logoutResult.errors));
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


function authenticate(result: Result<AuthActionResult, BaseErrorContainer>, res: Response, next: NextFunction) {
    if (!hasResult(result)) {
        return next(ApiError.Forbidden(result.errors));
    }

    const {accessToken, refreshToken, user} = result.entity as AuthActionResult;

    setRefreshTokenCookie(res, refreshToken, new Date(new Date().getTime() + configs.refreshTokenLifeTime));

    const authResult: AuthenticateResponse = {
        user: mapUserToUserPayload(user),
        accessToken
    }

    return res.json(authResult);
}

function setRefreshTokenCookie(res: Response, refreshToken: string | undefined, expires: Date) {
    res.cookie('refreshToken', refreshToken, {
        expires,
        domain: configs.cookieDomain,
        httpOnly: true
    });
}

export {authRouter}