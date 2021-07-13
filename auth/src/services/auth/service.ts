import { createUser } from "../../stores";
import { isNil } from 'lodash';
import { isSuccess, Result } from "../../types";
import { findUser, UserViewModel } from "../user";
import { TokenInfo } from "../token/types";
import { generateTokens } from "../token/service";

type AuthInfo = TokenInfo & {
    user?: UserViewModel;
}

export async function login(email: string, password: string) {
    
}

export async function registration(email: string, password: string): Promise<Result<AuthInfo>> {
    const user = await findUser(email);

    if(!isNil(user)) {
        return {
            errors: ['Пользователь с таким email уже существует']
        };
    }

    const result = await createUser(email, password);

    if(!isSuccess(result)) {
        return {
            errors: result.errors
        };
    }

    const payload: UserViewModel = {
        id: result.entity as number,
        email
    }

    const { refreshToken, accessToken } = generateTokens(payload);

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