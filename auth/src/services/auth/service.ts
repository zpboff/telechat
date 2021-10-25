import { createUser, getUser } from "../../stores";
import { isNil } from 'lodash';
import { buildResult, buildResultFromError, isSuccess, Result } from "../../types";
import { findUser, findUserByToken, mapUser, UserViewModel } from "../user";
import { generateTokens } from "../token/service";
import { compare, hash } from 'bcrypt';
import { configs } from "../../configs";
import { AuthInfo } from "./types";


export async function login(email: string, password: string): Promise<Result<AuthInfo>> {
    const result = await getUser(email);    

    if(!isSuccess(result) || isNil(result.entity)) {
        return buildResultFromError(['Пользователь не найден']);
    }

    const passwordsMatch = await compare(password, result.entity.password);

    if(!passwordsMatch) {
        return buildResultFromError(['Пароли не совпадают']);
    }

    const user = mapUser(result.entity);

    const { refreshToken, accessToken } = await generateTokens(user);

    return buildResult<AuthInfo>({
        accessToken,
        refreshToken,
        user
    });
}

export async function registration(email: string, password: string): Promise<Result<AuthInfo>> {
    const user = await findUser(email);

    if(!isNil(user)) {
        return buildResultFromError(['Пользователь с таким email уже существует']);
    }

    const passwordHash = await hash(password, configs.saltRounds);

    const result = await createUser(email, passwordHash);

    if(!isSuccess(result)) {

        return buildResultFromError(result.errors);
    }

    const payload: UserViewModel = {
        id: result.entity as number,
        email
    }

    const { refreshToken, accessToken } = await generateTokens(payload);

    return buildResult<AuthInfo>({
        accessToken,
        refreshToken,
        user: payload
    });
}

export async function logout() {
    
}

export async function refresh(token: string): Promise<Result<AuthInfo>> {
    const user = await findUserByToken(token);

    if(isNil(user)) {
        return buildResultFromError(['Пользователь не найден']);
    }

    const { refreshToken, accessToken } = await generateTokens(user as UserViewModel);

    return buildResult<AuthInfo>({
        accessToken,
        refreshToken,
        user
    });
}