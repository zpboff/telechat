import { Router } from 'express';
import { authorizeMiddleware } from '../middlewares/authorizeMiddleware';
import { findUser } from '../services';

const usersRouter = Router();

usersRouter.get('/get/:email', authorizeMiddleware, async (req, res) => {
    const user = await findUser(req.params.email);

    return res.json(user);    
});

export { usersRouter }