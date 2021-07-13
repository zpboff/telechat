import { Router } from 'express';
import { login, logout, registration } from '../services';

const authRouter = Router();

authRouter.post('/login', async (req, res) => {
    await login(req.body.email, req.body.password);

    return res.status(200).json({a: 1});
});

authRouter.post('/registration', async (req, res) => {
    const result = await registration(req.body.email, req.body.password);

    return res.status(200).json(result);
});

authRouter.get('/logout', async (_, res) => {
    await logout();
    return res.status(200).json({a: 3});
});

export { authRouter }