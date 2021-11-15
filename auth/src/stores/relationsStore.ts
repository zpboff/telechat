import {buildResult, HasId, Result} from "../types";
import {withCatch} from "../exceptions/withCatch";
import {pool} from "../db";
import {BaseErrorContainer} from "../exceptions/types";
import format from "pg-format";

export enum RelationState {
    Initial,
    Subscribed,
    Friend,
    Blocked,
}

export type RelationEntity = HasId<number> & {
    changedate: Date;
    createdate: Date;
    userId: number;
    userlogin: string;
    targetuserid: number;
    targetuserlogin: string;
    stateinitiatorid: number;
    stateinitiatorlogin: string;
    state: RelationState;
}

export async function createRelation(userId: number, targetUserId: number, state: RelationState) {
    const relationshipQuery = `
        INSERT INTO relationships
            (createdate)
        VALUES (current_timestamp)
        RETURNING id`;

    const membersQuery = `
        INSERT INTO relationshipmembers
            (relationshipid, userid)
        VALUES
            %L
        RETURNING id`;

    const stateQuery = `
        INSERT INTO relationshipstates
            (relationshipid, state, userid)
        VALUES ($1, $2, $3)
        RETURNING id`;

    const client = await pool.connect()

    return withCatch<number>(async () => {
        try {
            await client.query('BEGIN')

            const {rows} = await client.query<HasId<number>>(relationshipQuery);
            const [{id: relationshipId}] = rows;

            await client.query<HasId<number>>(format(membersQuery, [[relationshipId, userId], [relationshipId, targetUserId]]));
            await client.query<HasId<number>>(stateQuery, [relationshipId, userId, state]);

            await client.query('COMMIT');

            return buildResult(relationshipId);
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    });
}

export async function createRelationState(relationshipId: number, userId: number, state: RelationState) {
    const query = `
        INSERT INTO relationshipstates
            (relationshipid, userid, state)
        VALUES ($1, $2, $3)
        RETURNING id`;

    const client = await pool.connect()

    return withCatch<number>(async () => {
        const {rows} = await pool.query<HasId<number>>(query, [relationshipId, userId, state]);
        const [request] = rows;

        return buildResult(request.id);
    });
}

export async function getRelation(userId: number, targetUserId: number): Promise<Result<RelationEntity, BaseErrorContainer>> {
    const query = `
        SELECT r.id,
               us.id     as userid,
               us.login  as userlogin,
               tus.id    as targetuserid,
               tus.login as targetuserlogin,
               rs.state,
               i.id      as stateinitiatorid,
               i.login   as stateinitiatorlogin
        FROM relationshipmembers u
                 INNER JOIN LATERAL (
            SELECT *
            FROM relationshipmembers rm
            WHERE rm.relationshipid = u.relationshipid
              AND rm.userid = $2
            ) AS t ON TRUE
                 JOIN users us ON u.userid = us.id
                 JOIN users tus ON t.userid = tus.id
                 JOIN relationships r ON r.id = u.relationshipid
                 LEFT JOIN LATERAL (
            SELECT *
            FROM relationshipstates rs
            WHERE rs.relationshipid = r.id
            ORDER BY rs.createdate DESC
            LIMIT 1
            ) AS rs ON TRUE
                 JOIN users i ON rs.userid = i.id
        WHERE u.userid = $1`;

    return withCatch<RelationEntity>(async () => {
        const {rows} = await pool.query<RelationEntity>(query, [userId, targetUserId]);
        const [request] = rows;

        return buildResult(request);
    });
}