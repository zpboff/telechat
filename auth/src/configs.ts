import {config} from 'dotenv';

config();

type Configs = {
    port: string;
    secret: string;
    refreshTokenLifeTime: number;
    saltRounds: number;
    cookieDomain: string;
}

type DbConfigs = {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
}

type LoggerConfigs = {
    url: string;
    apiKey: string;
}

const configs: Configs = {
    port: process.env.PORT ?? "3001",
    secret: process.env.SECRET ?? "",
    refreshTokenLifeTime: 1000 * 60 * 60 * 24 * parseInt(process.env.REFRESH_TOKEN_LIFE_TIME_IN_DAYS ?? "0"),
    saltRounds: parseInt(process.env.SALT_ROUNDS ?? "10"),
    cookieDomain: process.env.COOKIE_DOMAIN ?? ""
}

const dbConfigs: DbConfigs = {
    host: process.env.SQL_DB_NAME ?? "localhost",
    port: parseInt(process.env.SQL_PORT ?? "5342"),
    database: process.env.SQL_DB_NAME ?? "telechat",
    username: process.env.SQL_USERNAME ?? "postgres",
    password: process.env.SQL_PASSWORD ?? "postgres",
}

const loggerConfigs: LoggerConfigs = {
    apiKey: process.env.SEQ_API_KEY ?? "",
    url: process.env.SEQ_URL ?? "",
}

export {configs, dbConfigs, loggerConfigs}