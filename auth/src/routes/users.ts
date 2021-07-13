import { Router } from 'express';
import { findUser } from '../services';

const usersRouter = Router();

usersRouter.get('/get/:email', async (req, res) => {
    const user = await findUser(req.params.email);

    return res.json(user);
});

export { usersRouter }