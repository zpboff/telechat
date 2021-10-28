import {Router} from 'express';
import {authorizeMiddleware} from '../middlewares';
import {findUserByEmail} from '../services';

const usersRouter = Router();

usersRouter.get('/get/:email', authorizeMiddleware, async (req, res) => {
    const user = await findUserByEmail(req.params.email);

    return res.json(user);
});

export {usersRouter}