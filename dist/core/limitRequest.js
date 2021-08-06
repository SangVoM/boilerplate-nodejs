'use strict';

var _expressRateLimit = require('express-rate-limit');

var _expressRateLimit2 = _interopRequireDefault(_expressRateLimit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Limiter = (0, _expressRateLimit2.default)({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 300, // limit each IP to 300 requests per windowMs
    message: 'Too many request from this IP, please try again after'
});

module.exports = Limiter;