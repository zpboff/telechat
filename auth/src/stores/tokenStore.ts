import { isNil } from "lodash";
import { pool } from "../db";
import { buildResult, buildResultFromError, HasId, Result } from "../types";

export type Token = HasId<number> & {
    email: string;
    token: string;
    createDate: Date;
    accessDate: Date;
    lifeTime: number;
}

export async function getTokenByEmail(email: string): Promise<Result<Token>> {
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
        
        return buildResultFromError([ex.message]);
    }
}

export async function getToken(token: string): Promise<Result<Token>> {
    try {
        const { rows } = await pool.query<Token>("SELECT * FROM tokens WHERE token=$1", [token]);
        const [tokenInfo] = rows;

        return isNil(tokenInfo) 
            ? buildResultFromError<Token>(['Токен не найден'])
            : buildResult(tokenInfo);
    }
    catch(ex) {
        console.log(ex);

        return buildResultFromError([ex.message]);
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

        return buildResult(result.id);
    }
    catch(ex) {
        console.log(ex);
        
        return buildResultFromError([ex.message]);
    }
}