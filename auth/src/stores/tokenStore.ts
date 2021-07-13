import { isNil } from "lodash";
import { pool } from "../db";
import { HasId, Result } from "../types";

export type Token = HasId<number> & {
    email: string;
    token: string;
    createDate: Date;
    accessDate: Date;
    lifeTime: number;
}

export async function getToken(email: string): Promise<Result<Token>> {
    try {
        const { rows } = await pool.query("SELECT * FROM tokens WHERE email=$1", [email]);
        const [tokenInfo] = rows;

        if(!isNil(tokenInfo)) {
            await pool.query("UPDATE Tokens SET accessDate=current_time where email=$1", [email]);
        }
    
        return {
            entity: tokenInfo,
            errors: isNil(tokenInfo) ? ['Токен не найден'] : []
        };
    }
    catch(ex) {
        console.log(ex);
        
        return {
            errors: [ex]
        };
    }
}

export async function createToken(email: string, token: string, lifeTime: number): Promise<Result<number>> {
    const query = `
INSERT INTO tokens
(email, token, lifeTime) 
VALUES($1, $2, $3)
RETURNING id`;

    try {
        const { rows } = await pool.query<HasId<number>>(query, [email, token, lifeTime]);
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