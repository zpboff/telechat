import { createUser, getUser, User } from "../stores";
import { isNil } from 'lodash';
import { sign } from 'jsonwebtoken';
import { configs } from "../configs";
import { Result } from "../types";

type AuthInfo = {
    accessToken: string;
    refreshToken: string;
    user?: User;
}

export async function login(email: string, password: string) {
    
}

export async function registration(email: string, password: string): Promise<Result<AuthInfo>> {
    const errors: string[] = [];
    const { result: user } = await getUser(email);

    if(!isNil(user)) {
        errors.push('Пользователь с таким email уже существует');
    }

    const res = await createUser(email, password);
    console.log(res);

    // const accessToken = sign('payload', configs.secret, {
    //     expiresIn: '15m'
    // });

    // const refreshToken = sign('payload', configs.secret, {
    //     expiresIn: '30 days'
    // });

    return {
        result: {
            accessToken: "accessToken",
            refreshToken: 'refreshToken'
        },
        errors
    }
}

export async function logout() {
    
}