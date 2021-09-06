import bunyan from 'bunyan';
import seq from 'bunyan-seq';
import { loggerConfigs } from '../configs';

const logger = bunyan.createLogger({
    name: 'telechat',
    streams: [
        {
            stream: process.stdout,
            level: 'warn',
        },
        seq.createStream({
            serverUrl: loggerConfigs.url,            
            apiKey: loggerConfigs.apiKey,
            name: 'telechat',
            level: 'info',
            onError: (e) => {
                console.error('[SeqStreamCustomError] failed to log events:', e);
            }
        })
    ]
});

export { logger }