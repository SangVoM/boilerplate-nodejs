'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressValidator = require('express-validator');

var _system = require('../../../utils/system');

var _validator = require('../../validator');

exports.default = [(0, _expressValidator.body)('username').trim().not().isEmpty().withMessage(_system.errors.REQUIRED_USERNAME).isLength({ max: 255 }).withMessage(_system.errors.USERNAME_MAX_255), (0, _expressValidator.body)('password').trim().not().isEmpty().withMessage(_system.errors.PASSWORD_REQUIRED).isLength({ min: 6 }).withMessage(_system.errors.PASSWORD_MIN_LENGTH_6_ERROR).isLength({ max: 255 }).withMessage(_system.errors.PASSWORD_MAX_255_ERROR), _validator.Validator.check()];