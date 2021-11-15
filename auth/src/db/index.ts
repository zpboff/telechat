import {Pool} from 'pg';
import {dbConfigs} from '../configs';

export const pool = new Pool({
    database: dbConfigs.database,
    user: dbConfigs.username,
    password: dbConfigs.password,
    port: dbConfigs.port
});

pool.on("error", (err, client) => {
    console.log(err.message, err.stack);
    client.release();
})