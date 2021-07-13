import { config } from 'dotenv';

config();

type Configs = {
    port: string;    
    secret: string;
    expiresIn: string;
}

type DbConfigs = {
    port: number;
    database: string;
    username: string;
    password: string;
}

const configs: Configs = {
    port: process.env.PORT ?? "3001",
    secret: process.env.SECRET ?? "",
    expiresIn: process.env.EXPIRES_IN ?? "30m"
}

const dbConfigs: DbConfigs = {
    port: parseInt(process.env.SQL_PORT ?? ""),
    database: process.env.SQL_DB_NAME ?? "",
    username: process.env.SQL_USERNAME ?? "",
    password: process.env.SQL_PASSWORD ?? "",
}

export { configs, dbConfigs }