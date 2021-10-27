import {isNil} from "lodash";
import {pool} from "../db";
import {buildResult, buildResultFromError, HasId, Result} from "../types";
import {BaseErrors} from "../services";
import {TokenInfo} from "../services/token/types";

export type Token = HasId<number> & {
    email: string;
    token: string;
    createDate: Date;
    accessDate: Date;
    expirationDate: Date;
}

type CountResult = {
    count: number;
}

export async function getTokenByEmail(email: string): Promise<Result<Token>> {
    try {
        const {rows} = await pool.query("SELECT * FROM tokens WHERE email=$1", [email]);
        const [tokenInfo] = rows;

        return await getTokenResult(tokenInfo);

    } catch (ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}

export async function getToken(token: string): Promise<Result<Token>> {
    try {
        const {rows} = await pool.query<Token>("SELECT * FROM tokens WHERE token=$1", [token]);
        const [tokenInfo] = rows;

        if(isNil(tokenInfo)) {
            const errors: BaseErrors = {
                common: "Токен не найден"
            }

            return buildResultFromError(errors);
        }

        return await getTokenResult(tokenInfo);
    } catch (ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}

export async function createToken(email: string, token: string, expirationDate: Date): Promise<Result<number>> {
    const query = `
INSERT INTO tokens
(email, token, expirationDate) 
VALUES($1, $2, $3)
RETURNING id`;

    try {
        const {rows} = await pool.query<HasId<number>>(query, [email, token, expirationDate]);
        const [result] = rows;

        return buildResult(result.id);
    } catch (ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}

export async function deleteToken(email: string, token: string): Promise<Result<number>> {
    const query = `
WITH deleted AS (
    DELETE FROM tokens
    WHERE token = $1 AND email = $2
    RETURNING id
) 
SELECT count(*) FROM deleted;`;

    try {
        const {rows} = await pool.query<CountResult>(query, [token, email]);
        const [result] = rows;

        return buildResult(result.count);
    } catch (ex) {
        console.log(ex);

        const errors: BaseErrors = {
            common: ex.message
        }

        return buildResultFromError(errors);
    }
}

async function getTokenResult(tokenInfo: Token): Promise<Result<Token>> {
    if(!isNil(tokenInfo)) {
        await pool.query("UPDATE Tokens SET accessDate=current_timestamp where id=$1", [tokenInfo.id]);
    }

    return buildResult(tokenInfo);
}
