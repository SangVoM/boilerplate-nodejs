'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.authenticated = exports.isExistedAdmin = undefined;

var _system = require('../../utils/system');

var _User = require('../../models/schema/User');

var _jwt = require('../../utils/jwt');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/**
 * isExistedAdmin middleware used for checking admin existed
 */
var isExistedAdmin = exports.isExistedAdmin = function isExistedAdmin() {
    return function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
            var username, user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.prev = 0;
                            username = req.body.username;
                            _context.next = 4;
                            return _User.User.findOne({
                                where: {
                                    username: username,
                                    deleted: false
                                }
                            });

                        case 4:
                            user = _context.sent;

                            if (user) {
                                _context.next = 7;
                                break;
                            }

                            return _context.abrupt('return', res.json((0, _system.jsonError)(_system.errors.USER_NOT_FOUND)));

                        case 7:

                            req.body.user = user;
                            return _context.abrupt('return', next());

                        case 11:
                            _context.prev = 11;
                            _context.t0 = _context['catch'](0);

                            (0, _system.handleExceptionResponse)(res, 'ERRORS_ADMIN_POLICIES_IS_EXISTED_ADMIN_MIDDLEWARE', _context.t0);

                        case 14:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined, [[0, 11]]);
        }));

        return function (_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();
};

var authenticated = exports.authenticated = function authenticated() {
    return function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res, next) {
            var authorization, decoded;
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.prev = 0;
                            authorization = req.header('Authorization');

                            if (authorization) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt('return', res.json((0, _system.jsonError)(_system.errors.NOT_AUTHENTICATED_ERROR)));

                        case 4:
                            _context2.next = 6;
                            return _jwt.Jwt.verify(authorization);

                        case 6:
                            decoded = _context2.sent;

                            if (decoded.success) {
                                _context2.next = 9;
                                break;
                            }

                            return _context2.abrupt('return', res.json(decoded));

                        case 9:

                            req.user = decoded.result;
                            return _context2.abrupt('return', next());

                        case 13:
                            _context2.prev = 13;
                            _context2.t0 = _context2['catch'](0);

                            (0, _system.handleExceptionResponse)(res, 'ERRORS_ADMIN_POLICIES_AUTHENTICATED_MIDDLEWARE', _context2.t0);

                        case 16:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[0, 13]]);
        }));

        return function (_x4, _x5, _x6) {
            return _ref2.apply(this, arguments);
        };
    }();
};