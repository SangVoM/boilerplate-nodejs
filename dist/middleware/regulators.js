'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.regulators = undefined;

var _system = require('../utils/system');

var _boot = require('../core/boot');

var requestLogger = function requestLogger() {
    return function (req, res, next) {
        if (['GET', 'POST', 'PUT', 'DELETE'].indexOf(req.method) >= 0) _system.logger.verbose(req.url, req.body);
        next();
    };
};

/** Check max length string attributes 255 of body*/
var checkMaxLengthBody = function checkMaxLengthBody() {
    return function (req, res, next) {
        try {
            if (req.body) {
                var keys = Object.keys(req.body);
                for (var i = 0; i < keys.length; i++) {
                    if (!_boot.textAttrs.includes(keys[i]) && req.body[keys[i]] && req.body[keys[i]].length > 255) {
                        return res.json((0, _system.jsonError)({ code: keys[i].toUpperCase() + '_MAX_255_ERROR' }));
                    }
                }
            }
            return next();
        } catch (error) {
            (0, _system.handleExceptionResponse)(res, 'ERRORS_CHECK_MAX_LENGTH_BODY_MIDDLEWARE', error);
        }
    };
};

var regulators = [requestLogger(), checkMaxLengthBody()];

exports.regulators = regulators;