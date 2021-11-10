import {buildResult, buildResultFromError, HasId, Result} from "../types";
import {withCatch} from "../exceptions/withCatch";
import {pool} from "../db";
import {isNil} from "lodash";
import {BaseErrors} from "../services";

export type SiteStatus = HasId<number> & {
    reason: string;
    createdate: Date;
    siteaccessible: boolean;
}

export async function getSiteStatus(): Promise<Result<SiteStatus>> {
    const query = `
SELECT 
    ss.id,
    s.reason,
    ss.createDate,
    s.siteAccessible
FROM SiteStatus ss
INNER JOIN Statuses s ON ss.statusId = s.id 
`;
    return await withCatch(async () => {
        const {rows} = await pool.query(query);
        const [status] = rows;

        if (isNil(status)) {
            const errors: BaseErrors = {
                common: 'Статус не определен'
            }
            return buildResultFromError(errors);
        }

        return buildResult(status);
    });
}