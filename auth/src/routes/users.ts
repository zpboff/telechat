import {Router} from 'express';
import {authorizeMiddleware} from '../middlewares';
import {findUserByLogin} from '../services';
import {mapUserViewModel} from "./auth/mapUserViewModel";

const usersRouter = Router();

usersRouter.get('/get/:login', authorizeMiddleware, async (req, res) => {
    const user = await findUserByLogin(req.params.login);
    const userViewModel = mapUserViewModel(user);

    return res.json(userViewModel);
});

export {usersRouter}