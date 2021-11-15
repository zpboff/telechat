import {Router} from "express";
import {authorizeMiddleware} from "../../middlewares";
import {findUserByLogin, setRelation} from "../../services";
import {mapUserToUserViewModel} from "../auth/mapUserToUserPayload";
import {hasError} from "../../types";
import {ApiError} from "../../exceptions/ApiError";
import {RelationState} from "../../stores/relationsStore";

const usersRouter = Router();

usersRouter.post('/subscribe/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await setRelation(req.user.login, req.params.login, RelationState.Subscribed);

    if(!hasError(result)) {
        return res.status(200).send();
    }

    next(ApiError.BadRequest(result.errors));
});

usersRouter.post('/accept/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await setRelation(req.user.login, req.params.login, RelationState.Friend);

    if(!hasError(result)) {
        return res.status(200).send();
    }

    next(ApiError.BadRequest(result.errors));
});

usersRouter.post('/cancel/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await setRelation(req.user.login, req.params.login, RelationState.Initial);

    if(!hasError(result)) {
        return res.status(200).send();
    }

    next(ApiError.BadRequest(result.errors));
});

usersRouter.post('/block/:login', authorizeMiddleware, async (req, res, next) => {
    const result = await setRelation(req.user.login, req.params.login, RelationState.Blocked);

    if(!hasError(result)) {
        return res.status(200).send();
    }

    next(ApiError.BadRequest(result.errors));
});

usersRouter.get('/get/:login', authorizeMiddleware, async (req, res) => {
    const user = await findUserByLogin(req.params.login);
    const userViewModel = await mapUserToUserViewModel(req.user.login, user);

    return res.json(userViewModel);
});

export {usersRouter}