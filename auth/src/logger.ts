import { Logger, SeqLogLevel } from 'seq-logging';

const logger = new Logger({
    serverUrl: process.env.SEQ_URL,
    onError: console.log
});

function log(messageTemplate: string, properties: object, exception: string = "", level: SeqLogLevel = exception ? "Error" : "Information") {
    logger.emit({
        timestamp: new Date(),
        level,
        messageTemplate,
        properties,
        exception
    });
}

function debug(messageTemplate: string, properties: object) {
    log(messageTemplate, properties, undefined, "Debug");
}

function error(messageTemplate: string, properties: object, exception: string,) {
    log(messageTemplate, properties, exception);
}

export {
    logger,
    log,
    debug,
    error
}
