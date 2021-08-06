'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handleExceptionResponse = exports.logger = exports.jsonError = exports.jsonSuccess = exports.errors = undefined;

var _winston = require('./winston');

var _winston2 = _interopRequireDefault(_winston);

var _winston3 = require('winston');

var _winston4 = _interopRequireDefault(_winston3);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var errors = {
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
    NOT_AUTHENTICATED_ERROR: { code: 'NOT_AUTHENTICATED_ERROR' }
};
/** Define group log */
var logAttribute = {
    type: { info: 'info', error: 'error' }
};

var jsonSuccess = function jsonSuccess() {
    var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    return { success: true, result: result };
};

var jsonError = function jsonError() {
    var err = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

    return { success: false, error: err };
};

/** Config logger */
var configLogger = function configLogger(_ref) {
    var data = _ref.data,
        type = _ref.type,
        message = _ref.message;

    try {
        if (data && type) {
            var date = (0, _moment2.default)().format('YYYY-MM-DD');
            var filename = getEnv('PATH_LOG') + '/' + type + '/' + date + '.log';

            var fileLogger = _winston4.default.createLogger({
                transports: [new _winston4.default.transports.File({
                    filename: filename,
                    colorize: true
                })],
                exitOnError: false
            });

            data = type === logAttribute.type.error ? { name: data, message: message } : data;
            fileLogger[type]({ time: (0, _moment2.default)(), data: data });
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
var handleExceptionResponse = function handleExceptionResponse(res, errName, err) {
    // Logger
    logger.error(new Date().toDateString() + '_' + errName, err);

    if (err.original && err.original.code === 'ER_DUP_ENTRY') {
        return res.json(jsonError(errors.DUPLICATED_ERROR));
    }

    return res.json(jsonError(errors.SYSTEM_ERROR));
};

var logger = {
    verbose: function verbose(message) {
        if (getEnv('FULL_LOG') !== 'true') return;
        return _winston2.default.verbose(message);
    },
    warn: function warn(message) {
        if (getEnv('FULL_LOG') !== 'true') return;
        return _winston2.default.warn(message);
    },
    error: function error(message, _error, attr) {
        /** Write log*/
        configLogger({ data: _error, type: logAttribute.type.error, message: message });

        return _winston2.default.error(message + '::' + _error);
    },
    info: function info(message, attr) {
        try {
            /** Write log*/
            configLogger({ data: attr, type: logAttribute.type.info, message: message });
            return _winston2.default.info(message);
        } catch (error) {
            throw error;
        }
    }
};

exports.errors = errors;
exports.jsonSuccess = jsonSuccess;
exports.jsonError = jsonError;
exports.logger = logger;
exports.handleExceptionResponse = handleExceptionResponse;