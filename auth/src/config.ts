import { config } from 'dotenv';

config();

type Config = {
    port: string,
    seqUrl: string,
    secret: string
}

export const configs: Config = {
    port: process.env.PORT ?? "",
    seqUrl: process.env.SEQ_URL ?? "",
    secret: process.env.SECRET_KEY ?? ""
}