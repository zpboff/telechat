import { isNil } from "lodash";
import { pool } from "../db";
import { HasId, Result } from "../types";

export type User = HasId<number> & {
    email: string;
    password: string;
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
        
        return {
            errors: [ex]
        };
    }
}

export async function createUser(email: string, password: string): Promise<Result<number>> {
    const query = `
INSERT INTO users
(email, password) 
VALUES($1, $2)
RETURNING id`;

    try {
        const { rows } = await pool.query<HasId<number>, string[]>(query, [email, password]);
        const [result] = rows;

        return {
            entity: result.id
        };
    }
    catch(ex) {
        console.log(ex);
        
        return {
            errors: [ex.message]
        }
    }
}