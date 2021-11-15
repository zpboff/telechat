import {isNil} from "lodash";
import {pool} from "../db";
import {buildResult, buildResultFromError, HasId, Result} from "../types";
import {UserCreateModel} from "../services";
import {withCatch} from "../exceptions/withCatch";
import {BaseErrorContainer} from "../exceptions/types";

export type UserEntity = HasId<number> & {
    email: string;
    password: string;
    login: string;
    firstname: string;
    lastname: string;
    createdate: Date;
    updatedate: Date;
}

export function getUserById(userId: number): Promise<Result<UserEntity, BaseErrorContainer>> {
    return getUser("SELECT * FROM USERS WHERE id=$1", [userId]);
}

export function getUserByEmail(email: string): Promise<Result<UserEntity, BaseErrorContainer>> {
    return getUser("SELECT * FROM USERS WHERE email=$1", [email]);
}

export function getUserByLogin(login: string): Promise<Result<UserEntity, BaseErrorContainer>> {
    return getUser("SELECT * FROM USERS WHERE login=$1", [login]);
}

async function getUser(query: string, params: unknown[]): Promise<Result<UserEntity, BaseErrorContainer>> {
    return await withCatch(async () => {
        const {rows} = await pool.query(query, params);
        const [user] = rows;

        if (isNil(user)) {
            const errors: BaseErrorContainer = {
                common: ['Пользователь не найден']
            }
            return buildResultFromError(errors);
        }

        return buildResult(user);
    });
}

export async function createUser(user: UserCreateModel): Promise<Result<UserEntity, BaseErrorContainer>> {
    const {email, password, firstName, lastName} = user;

    const query = `
        INSERT INTO users
            (email, password, firstName, lastName)
        VALUES ($1, $2, $3, $4)
        RETURNING *`;

    return await withCatch(async () => {
        const {rows} = await pool.query<UserEntity, string[]>(query, [email, password, firstName, lastName]);
        const [result] = rows;

        return buildResult(result);
    });
}