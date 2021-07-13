import { Response, Router } from 'express';
import { configs } from '../configs';
import { AuthInfo, login, logout, registration } from '../services';
import { isCorrect, isSuccess, Result } from '../types';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    const result = await login(req.body.email, req.body.password);


    return authenticate(result, res);
});

authRouter.post('/registration', async (req, res) => {
    const result = await registration(req.body.email, req.body.password);

    if(!isCorrect(result)) {
        return res.status(401).json({ errors: result.errors });
    }

    return authenticate(result, res);
});

authRouter.get('/logout', async (_, res) => {
    await logout();

    return res.status(200);
});


function authenticate(result: Result<AuthInfo>, res: Response) {    
    if(!isCorrect(result)) {
        return res.status(401).json({ errors: result.errors });
    }

    const { accessToken, refreshToken, user } = result.entity as AuthInfo;

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        expires: new Date(new Date().getTime() + configs.lifeTime)
    });

    return res.json({ accessToken, user });
}

export { authRouter }