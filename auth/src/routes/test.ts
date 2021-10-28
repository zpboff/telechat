import { Router } from 'express';
import { loggerMiddleware } from '../middlewares';

const testRouter = Router();

testRouter.get('/', loggerMiddleware, async (req, res) => {
    const s = req.cookies;
    return res.send({ id: 5 })
});

export { testRouter }