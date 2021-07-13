import { Router } from 'express';
import { authorize } from '../middlewares/authorizeMiddleware';
import { findUser } from '../services';

const usersRouter = Router();

usersRouter.get('/get/:email', authorize, async (req, res) => {
    const user = await findUser(req.params.email);

    return res.json(user);
});

export { usersRouter }