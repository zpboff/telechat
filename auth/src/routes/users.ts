import { Router } from 'express';
import { getUser } from '../stores';

const usersRouter = Router();

usersRouter.get('/get/:email', async (req, res) => {
    const user = await getUser(req.params.email);

    return res.status(200).json(user);
});

export { usersRouter }