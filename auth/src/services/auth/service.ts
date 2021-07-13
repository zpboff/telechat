import { createUser, getUser } from "../../stores";
import { isNil } from 'lodash';
import { isSuccess, Result } from "../../types";
import { findUser, mapUser, UserViewModel } from "../user";
import { generateTokens } from "../token/service";
import { compare, hash } from 'bcrypt';
import { configs } from "../../configs";
import { AuthInfo } from "./types";


export async function login(email: string, password: string): Promise<Result<AuthInfo>> {
    const result = await getUser(email);    

    if(!isSuccess(result) || isNil(result.entity)) {
        return {
            errors: ['Пользователь не найден']
        };
    }

    const passwordsMatch = await compare(password, result.entity.password);

    if(!passwordsMatch) {
        return {
            errors: ['Пароли не совпадают']
        };
    }

    const user = mapUser(result.entity);

    const { refreshToken, accessToken } = await generateTokens(user);

    return {
        entity: {
            accessToken,
            refreshToken,
            user
        }
    }
}

export async function registration(email: string, password: string): Promise<Result<AuthInfo>> {
    const user = await findUser(email);

    if(!isNil(user)) {
        return {
            errors: ['Пользователь с таким email уже существует']
        };
    }

    const passwordHash = await hash(password, configs.saltRounds);

    const result = await createUser(email, passwordHash);

    if(!isSuccess(result)) {
        return {
            errors: result.errors
        };
    }

    const payload: UserViewModel = {
        id: result.entity as number,
        email
    }

    const { refreshToken, accessToken } = await generateTokens(payload);

    return {
        entity: {
            accessToken,
            refreshToken,
            user: payload
        }
    }
}

export async function logout() {
    
}