import { Router } from 'express';
import { loggerMiddleware } from '../middlewares/loggerMiddleware';

const testRouter = Router();

testRouter.get('/', loggerMiddleware, async (req, res) => {
    return res.send({ id: 5 })
});

export { testRouter }