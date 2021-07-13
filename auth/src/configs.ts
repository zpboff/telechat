import { config } from 'dotenv';

config();

type Configs = {
    port: string;    
    secret: string;
    lifeTime: number;
    saltRounds: number;
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
    lifeTime: parseInt(process.env.EXPIRES_IN ?? "") || 60*60*24*365,
    saltRounds: parseInt(process.env.SALT_ROUNDS ?? "10")
}

const dbConfigs: DbConfigs = {
    port: parseInt(process.env.SQL_PORT ?? "5342"),
    database: process.env.SQL_DB_NAME ?? "telechat",
    username: process.env.SQL_USERNAME ?? "postgres",
    password: process.env.SQL_PASSWORD ?? "postgres",
}

export { configs, dbConfigs }