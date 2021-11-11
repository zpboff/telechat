import {Router} from "express";
import {authorizeMiddleware} from "../../middlewares";
import {findUserByLogin, sendFriendRequest} from "../../services";
import {mapUserViewModel} from "../auth/mapUserViewModel";
import {hasError} from "../../types";
import {ApiError} from "../../exceptions/ApiError";

const usersRouter = Router();

usersRouter.post('/subscribe/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await sendFriendRequest(req.user.login, req.params.login);

    if(hasError(result)) {
        return next(ApiError.BadRequest(result.errors));
    }

    return res.status(200).send();
});

usersRouter.post('/acceptSubscribe/:login', authorizeMiddleware, async (req, res) => {
    return res.status(200).json({success: true});
});

usersRouter.get('/get/:login', authorizeMiddleware, async (req, res) => {
    const user = await findUserByLogin(req.params.login);
    const userViewModel = await mapUserViewModel(user);

    return res.json(userViewModel);
});

export {usersRouter}