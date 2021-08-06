import winston from 'winston';
import path from 'path';

const options = {
    file: {
        level: 'info',
        format: winston.format.simple(),
        filename: path.join(__dirname, '../../mylogs/app.log'),
        json: true,
        colorize: false
    },
    console: {
        level: 'verbose',
        format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
        json: false,
        colorize: true
    }
};

const logger = winston.createLogger({
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log`
        // - Write all logs error (and below) to `error.log`.
        //
        // new winston.transports.File(options.file),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.morganStream = {
    write: function(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};

export default logger;
