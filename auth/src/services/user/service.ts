import {getUserById, getUserByEmail, UserEntity, getUserByLogin} from "../../stores";
import {getToken} from "../../stores/tokenStore";
import {isCorrect, isSuccess} from "../../types";
import {mapUser} from "./mapper";

export type User = {
    id: number;
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    createDate: Date;
    updateDate: Date;
};

export async function findUser(userId: number): Promise<User | null> {
    const result = await getUserById(userId);

    if (isSuccess(result)) {
        return mapUser(result.entity);
    }

    return null;
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await getUserByEmail(email);

    if (isSuccess(result)) {
        return mapUser(result.entity);
    }

    return null;
}

export async function findUserByLogin(login: string): Promise<User | null> {
    const result = await getUserByLogin(login);

    if (isSuccess(result)) {
        return mapUser(result.entity);
    }

    return null;
}

export async function findUserByToken(refreshToken: string): Promise<User | null> {
    const tokenInfo = await getToken(refreshToken)

    if (!isCorrect(tokenInfo)) {
        return null;
    }

    return await findUser(tokenInfo.entity?.userid as number);
}