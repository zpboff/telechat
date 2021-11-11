import {getUserById, getUserByEmail, getUserByLogin} from "../../stores";
import {getToken} from "../../stores";
import {hasResult, hasError} from "../../types";
import {mapUserEntityToUser} from "./mapper";
import {User} from "./types";

export async function findUser(userId: number): Promise<User | null> {
    const result = await getUserById(userId);

    if (!hasError(result)) {
        return mapUserEntityToUser(result.entity);
    }

    return null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await getUserByEmail(email);

    if (!hasError(result)) {
        return mapUserEntityToUser(result.entity);
    }

    return null;
}

export async function findUserByLogin(login: string): Promise<User | null> {
    const result = await getUserByLogin(login);

    if (!hasError(result)) {
        return mapUserEntityToUser(result.entity);
    }

    return null;
}

export async function findUserByToken(refreshToken: string): Promise<User | null> {
    const tokenInfo = await getToken(refreshToken)

    if (!hasResult(tokenInfo)) {
        return null;
    }

    return await findUser(tokenInfo.entity?.userid as number);
}