'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthController = undefined;

var _system = require('../../utils/system');

var _AuthService = require('../../services/Admin/AuthService');

var _AuthService2 = _interopRequireDefault(_AuthService);

var _policies = require('../../middleware/Admin/policies');

var _loginValidator = require('../../validations/api/Admin/loginValidator');

var _loginValidator2 = _interopRequireDefault(_loginValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/** import validator */


var AuthController = require('express').Router();
AuthController.base = 'auth';

/**
 * @description Login with email or username and password
 * @param {String} email
 * @param {String} password
 */
AuthController.post('/login', [_loginValidator2.default, (0, _policies.isExistedAdmin)()], function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _AuthService2.default.login(req.body);

                    case 3:
                        result = _context.sent;

                        res.json(result);
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        (0, _system.handleExceptionResponse)(res, 'ERRORS_ADMIN_LOGIN_API', _context.t0);

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
}());

AuthController.get('/getInfo', [(0, _policies.authenticated)()], function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return _AuthService2.default.getInfo(req.user);

                    case 3:
                        result = _context2.sent;

                        res.json(result);
                        _context2.next = 10;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2['catch'](0);

                        (0, _system.handleExceptionResponse)(res, 'ERRORS_GET_INFO_API', _context2.t0);

                    case 10:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 7]]);
    }));

    return function (_x3, _x4) {
        return _ref2.apply(this, arguments);
    };
}());

exports.AuthController = AuthController;