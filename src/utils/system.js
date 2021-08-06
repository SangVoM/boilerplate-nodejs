import winston from './winston';
import winstonLb from 'winston';
import moment from 'moment';

const errors = {
    // -- SYSTEM errors
    SYSTEM_ERROR: { code: 'SYSTEM_ERROR' },
    ENV_NOT_SET_ERROR: { code: 'ENV_NOT_SET_ERROR' },
    SERVER_SHUTTING_DOWN: { code: 'SERVER_SHUTTING_DOWN' },
    LISTEN_ERROR: { code: 'LISTEN_ERROR' },
    DUPLICATED_ERROR: { code: 'DUPLICATED_ERROR' },
    NOT_FOUND_ERROR: { code: 'NOT_FOUND_ERROR' },

    // -- USER errors
    REQUIRED_USERNAME: { code: 'REQUIRED_USERNAME' },
    USERNAME_MAX_255: { code: 'USERNAME_MAX_255' },
    PASSWORD_REQUIRED: { code: 'PASSWORD_REQUIRED' },
    PASSWORD_MIN_LENGTH_6_ERROR: { code: 'PASSWORD_MIN_LENGTH_6_ERROR' },
    PASSWORD_MAX_255_ERROR: { code: 'PASSWORD_MAX_255_ERROR' },
    USER_NOT_FOUND: { code: 'USER_NOT_FOUND' },
    PASSWORD_WRONG: { code: 'PASSWORD_WRONG' },
    INVALID_TOKEN: { code: 'INVALID_TOKEN' },
    TOKEN_EXPIRED_ERROR: { code: 'TOKEN_EXPIRED_ERROR' },
    NOT_AUTHENTICATED_ERROR: { code: 'NOT_AUTHENTICATED_ERROR' },
    NOT_AUTHENTICATED: { code: 'NOT_AUTHENTICATED' }
};
/** Define group log */
const logAttribute = {
    type: { info: 'info', error: 'error' }
};

const jsonSuccess = (result = null) => {
    return { success: true, result };
};

const jsonError = (err = null) => {
    return { success: false, error: err };
};

/** Config logger */
const configLogger = ({ data, type, message }) => {
    try {
        if (data && type) {
            const date = moment().format('YYYY-MM-DD');
            const filename = `${getEnv('PATH_LOG')}/${type}/${date}.log`;

            const fileLogger = winstonLb.createLogger({
                transports: [
                    new winstonLb.transports.File({
                        filename: filename,
                        colorize: true
                    })
                ],
                exitOnError: false
            });

            data = type === logAttribute.type.error ? { name: data, message: message } : data;
            fileLogger[type]({ time: moment(), data });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

/**
 * Exception handler in catch controller
 * @param {Object} res response
 * @param {any} error error
 */
const handleExceptionResponse = (res, errName, err) => {
    // Logger
    logger.error(`${new Date().toDateString()}_${errName}`, err);

    if (err.original && err.original.code === 'ER_DUP_ENTRY') {
        return res.json(jsonError(errors.DUPLICATED_ERROR));
    }

    return res.json(jsonError(errors.SYSTEM_ERROR));
};

const logger = {
    verbose: message => {
        if (getEnv('FULL_LOG') !== 'true') return;
        return winston.verbose(message);
    },
    warn: message => {
        if (getEnv('FULL_LOG') !== 'true') return;
        return winston.warn(message);
    },
    error: (message, error, attr) => {
        /** Write log*/
        configLogger({ data: error, type: logAttribute.type.error, message });

        return winston.error(`${message}::${error}`);
    },
    info: (message, attr) => {
        try {
            /** Write log*/
            configLogger({ data: attr, type: logAttribute.type.info, message });
            return winston.info(message);
        } catch (error) {
            throw error;
        }
    }
};

export { errors, jsonSuccess, jsonError, logger, handleExceptionResponse };
