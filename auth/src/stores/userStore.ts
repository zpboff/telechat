import { isNil } from "lodash";
import { pool } from "../db";
import { buildResult, buildResultFromError, HasId, Result } from "../types";
import {BaseErrors, UserCreateModel} from "../services";

export type User = HasId<number> & {
    email: string;
    password: string;
    login: string;
    firstName: string;
    lastName: string;
    createDate: Date;
    updateDate: Date;
}

export async function getUser(email: string): Promise<Result<User>> {
    try {
        const { rows } = await pool.query("SELECT * FROM USERS WHERE Email=$1", [email]);
        const [user] = rows;

        return {
            entity: user,
            errors: isNil(user) ? ['Пользователь не найден'] : []
        };
    }
    catch(ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}

export async function createUser(user: UserCreateModel): Promise<Result<number>> {
    const { email, password, firstName, lastName } = user;

    const query = `
INSERT INTO users
(email, password, firstName, lastName) 
VALUES($1, $2, $3, $4)
RETURNING id`;

    try {
        const { rows } = await pool.query<HasId<number>, string[]>(query, [email, password, firstName, lastName]);
        const [result] = rows;

        return buildResult(result.id);
    }
    catch(ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}