import {Router} from "express";
import {authorizeMiddleware} from "../../middlewares";
import {findUserByLogin, subscribe} from "../../services";
import {mapUserToUserPayload, mapUserToUserViewModel} from "../auth/mapUserToUserPayload";
import {hasError} from "../../types";
import {ApiError} from "../../exceptions/ApiError";

const usersRouter = Router();

usersRouter.post('/subscribe/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await subscribe(req.user.login, req.params.login);

    if(!hasError(result)) {
        return res.status(200).send();
    }

    next(ApiError.BadRequest(result.errors));
});

usersRouter.post('/acceptSubscribe/:login', authorizeMiddleware, async (req, res) => {
    return res.status(200).json({success: true});
});

usersRouter.get('/get/:login', authorizeMiddleware, async (req, res) => {
    const user = await findUserByLogin(req.params.login);
    const userViewModel = await mapUserToUserViewModel(req.user.login, user);

    return res.json(userViewModel);
});

export {usersRouter}