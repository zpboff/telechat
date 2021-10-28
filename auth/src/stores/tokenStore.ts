import {isNil} from "lodash";
import {pool} from "../db";
import {buildResult, buildResultFromError, HasId, Result} from "../types";
import {BaseErrors} from "../services";
import {withCatch} from "../exceptions/withCatch";

export type Token = HasId<number> & {
    userId: number;
    token: string;
    createDate: Date;
    accessDate: Date;
    expirationDate: Date;
}

type CountResult = {
    count: number;
}

export async function getTokenByUser(userId: number): Promise<Result<Token>> {
    return withCatch<Token>(async () => {
        const {rows} = await pool.query("SELECT * FROM tokens WHERE userId=$1", [userId]);
        const [tokenInfo] = rows;

        return await getTokenResult(tokenInfo);
    });
}

export async function getToken(token: string): Promise<Result<Token>> {
    return withCatch<Token>(async () => {
        const {rows} = await pool.query<Token>("SELECT * FROM tokens WHERE token=$1", [token]);
        const [tokenInfo] = rows;

        if (isNil(tokenInfo)) {
            const errors: BaseErrors = {
                common: "Токен не найден"
            }

            return buildResultFromError(errors);
        }

        return await getTokenResult(tokenInfo);
    });
}

export async function createToken(userId: number, token: string, expirationDate: Date): Promise<Result<number>> {
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

export async function deleteToken(userId: string, token: string): Promise<Result<number>> {
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

async function getTokenResult(tokenInfo: Token): Promise<Result<Token>> {
    if (!isNil(tokenInfo)) {
        await pool.query("UPDATE Tokens SET accessDate=current_timestamp where id=$1", [tokenInfo.id]);
    }

    return buildResult(tokenInfo);
}
