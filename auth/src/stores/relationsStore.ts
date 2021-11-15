import {buildResult, HasId, Result} from "../types";
import {withCatch} from "../exceptions/withCatch";
import {pool} from "../db";
import {BaseErrorContainer} from "../exceptions/types";

export enum RelationState {
    Initial,
    Subscribed,
    Friend,
    Blocked
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

export async function updateRelationState(userId: number, targetUserId: number, state: RelationState) {
    const insertRelationStateQuery = `
        INSERT INTO relationshipstates
            (relationshipid, state, userid)
        VALUES ($1, $2, $3)
        RETURNING id`;

    const insertMembersStateQuery = `
        INSERT INTO relationshipmembers
            (relationshipid, userid)
        VALUES
        %L
        RETURNING id`;

    const mergeRelationshipQuery = `
        INSERT INTO relationshipmembers
            (relationshipid, userid)
        VALUES
        %L
        RETURNING id`;

    const mergeRelationQuery = `
        MERGE INTO userRelations ur
        USING (
            SELECT $1 AS userid, $2 AS targetuserid, $3 as stateid
        ) s
        ON ur.userid = s.userid and ur.targetuserid = s.targetuserid or ur.userid = s.targetuserid and ur.targetuserid = s.userid
        WHEN NOT MATCHED 
          INSERT (userid, targetuserid, stateid)
          VALUES (s.userid, s.targetuserid, s.stateid)
        WHEN MATCHED
          UPDATE SET stateid = s.stateid
        RETURNING id`;

    const client = await pool.connect()

    return withCatch<number>(async () => {
        try {
            await client.query('BEGIN')

            const {rows} = await client.query<HasId<number>>(insertRelationStateQuery, [userId, state]);
            const [{id: stateId}] = rows;

            const {rows: relationRows} = await client.query<HasId<number>>(mergeRelationQuery, [userId, targetUserId, stateId]);
            const [{id: relationId}] = relationRows;

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

export async function getRelation(userId: number, targetUserId: number): Promise<Result<RelationEntity, BaseErrorContainer>> {
    const query = `
SELECT 
       r.id, 
       us.id as userid,
       us.login as userlogin,
       tus.id as targetuserid,
       tus.login as targetuserlogin,
       rs.state,
       i.id as stateinitiatorid,
       i.login as stateinitiatorlogin 
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
        const result = await pool.query<RelationEntity>(query, [userId, targetUserId]);
        const {rows} = result;
        const [request] = rows;

        return buildResult(request);
    });
}