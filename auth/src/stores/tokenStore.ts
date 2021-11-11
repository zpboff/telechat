import {isNil} from "lodash";
import {pool} from "../db";
import {buildResult, buildResultFromError, HasId, Result} from "../types";
import {withCatch} from "../exceptions/withCatch";
import {BaseErrorContainer} from "../exceptions/types";

export type TokenEntity = HasId<number> & {
    userid: number;
    token: string;
    createdate: Date;
    accessdate: Date;
    expirationdate: Date;
}

type CountResult = {
    count: number;
}

export async function getTokenByUser(userId: number): Promise<Result<TokenEntity, BaseErrorContainer>> {
    const query = "SELECT * FROM tokens WHERE userId=$1";

    return withCatch<TokenEntity>(async () => {
        const {rows} = await pool.query(query, [userId]);
        const [tokenInfo] = rows;

        return await getTokenResult(tokenInfo);
    });
}

export async function getToken(token: string): Promise<Result<TokenEntity, BaseErrorContainer>> {
    const query = "SELECT * FROM tokens WHERE token=$1";
    return withCatch<TokenEntity>(async () => {
        const {rows} = await pool.query<TokenEntity>(query, [token]);
        const [tokenInfo] = rows;

        if (isNil(tokenInfo)) {
            const errors: BaseErrorContainer = {
                common: ["Токен не найден"]
            }

            return buildResultFromError(errors);
        }

        return await getTokenResult(tokenInfo);
    });
}

export async function createToken(userId: number, token: string, expirationDate: Date): Promise<Result<number, BaseErrorContainer>> {
    const query = `
INSERT INTO tokens
(userId, token, expirationDate) 
VALUES($1, $2, $3)
RETURNING id`;

    return withCatch<number>(async () => {
        const {rows} = await pool.query<HasId<number>>(query, [userId, token, expirationDate]);
        const [result] = rows;

        return buildResult(result.id);
    });
}

export async function deleteToken(userId: string, token: string): Promise<Result<number, BaseErrorContainer>> {
    const query = `
WITH deleted AS (
    DELETE FROM tokens
    WHERE token = $1 AND userId = $2
    RETURNING id
) 
SELECT count(*) FROM deleted;`;

    return withCatch<number>(async () => {
        const {rows} = await pool.query<CountResult>(query, [token, userId]);
        const [result] = rows;

        return buildResult(result.count);
    });
}

async function getTokenResult(tokenInfo: TokenEntity): Promise<Result<TokenEntity, BaseErrorContainer>> {
    const query = "UPDATE Tokens SET accessDate=current_timestamp where id=$1";

    await pool.query(query, [tokenInfo.id]);

    return buildResult(tokenInfo);
}
