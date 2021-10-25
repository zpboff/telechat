import { NextFunction, Response, Router } from 'express';
import { configs } from '../configs';
import { ApiError } from '../exceptions/ApiError';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware';
import { AuthInfo, login, logout, refresh, registration } from '../services';
import { isCorrect, Result } from '../types';

const authRouter = Router();

authRouter.post('/login', async (req, res, next) => {
    const result = await login(req.body.email, req.body.password);

    return authenticate(result, res, next);
});

authRouter.post('/registration', async (req, res, next) => {
    const result = await registration(req.body.email, req.body.password);

    if(!isCorrect(result)) {
        return res.status(401).json({ errors: result.errors });
    }

    return authenticate(result, res, next);
});

authRouter.get('/logout', async (_, res) => {
    await logout();

    return res.status(200);
});

authRouter.get('/check', authorizeMiddleware, async (_, res) => {
    return res.json();
});

authRouter.get('/refresh', async (req, res, next) => {
    const { refreshToken } = req.cookies;

    if(!refreshToken) {
        return next(ApiError.Unauthorized());
    }    

    const result = await refresh(refreshToken);

    return authenticate(result, res, next);
});


function authenticate(result: Result<AuthInfo>, res: Response, next: NextFunction) {    
    if(!isCorrect(result)) {
        return next(ApiError.Unauthorized(result.errors));
    }

    const { accessToken, refreshToken, user } = result.entity as AuthInfo;

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + configs.lifeTime)
    });

    return res.json({ accessToken, user });
}

export { authRouter }