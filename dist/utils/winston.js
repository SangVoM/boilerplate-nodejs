'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _winston = require('winston');

var _winston2 = _interopRequireDefault(_winston);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = {
    file: {
        level: 'info',
        format: _winston2.default.format.simple(),
        filename: _path2.default.join(__dirname, '../../mylogs/app.log'),
        json: true,
        colorize: false
    },
    console: {
        level: 'verbose',
        format: _winston2.default.format.combine(_winston2.default.format.colorize(), _winston2.default.format.simple()),
        json: false,
        colorize: true
    }
};

var logger = _winston2.default.createLogger({
    transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    // new winston.transports.File(options.file),
    new _winston2.default.transports.Console(options.console)],
    exitOnError: false
});

// create a stream object with a 'write' function that will be used by `morgan`
logger.morganStream = {
    write: function write(message, encoding) {
        // use the 'info' log level so the output will be picked up by both transports (file and console)
        logger.info(message.substring(0, message.lastIndexOf('\n')));
    }
};

exports.default = logger;