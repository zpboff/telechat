import {buildResult, HasId, Result} from "../types";
import {withCatch} from "../exceptions/withCatch";
import {pool} from "../db";
import {BaseErrorContainer} from "../exceptions/types";

export type UsersRelationsEntity = HasId<number> & {
    userid: number;
    targetuserid: number;
    state: UsersRelationsState;
}

export enum UsersRelationsState {
    Pending,
    Accepted,
    Blocked,
    Canceled
}

export async function createFriendRequest(userId: number, targetUserId: number) {
    const insertRelationStateQuery = `
        INSERT INTO userRelationsState
            (userId, state)
        VALUES ($1, $2)
        RETURNING id`;

    const insertRelationStatusQuery = `
        INSERT INTO userRelations
            (userId, targetUserId, stateid)
        VALUES ($1, $2, $3)
        RETURNING id`;

    const client = await pool.connect()

    return withCatch<number>(async () => {
        try {
            await client.query('BEGIN')

            const {rows} = await client.query<HasId<number>>(insertRelationStateQuery, [userId, UsersRelationsState.Pending]);
            const [{ id: stateId }] = rows;

            const {rows: relationRows} = await client.query<HasId<number>>(insertRelationStatusQuery, [userId, targetUserId, stateId]);
            const [{ id: relationId }] = relationRows;

            await client.query('COMMIT');

            return buildResult(relationId);
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    });
}

export async function getRequest(userId: number, targetUserId: number): Promise<Result<UsersRelationsEntity, BaseErrorContainer>> {
    const query = `
        SELECT
            ur.userid,
            ur.targetuserid,
            urs.state
        FROM userRelations ur
        JOIN userRelationsState urs ON ur.stateid = urs.id
        WHERE ur.userid = $1
          AND ur.targetUserId = $2
        ORDER BY urs.id DESC
        LIMIT 1`;

    return withCatch<UsersRelationsEntity>(async () => {
        const {rows} = await pool.query<UsersRelationsEntity>(query, [userId, targetUserId]);
        const [request] = rows;

        return buildResult(request);
    });
}
