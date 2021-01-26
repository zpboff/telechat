import { config } from 'dotenv';

config();

type Config = {
    port: string,
    seqUrl: string
}

export const configs: Config = {
    port: process.env.PORT ?? "",
    seqUrl: process.env.SEQ_URL ?? ""
}