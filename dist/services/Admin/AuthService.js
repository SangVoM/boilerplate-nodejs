'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _system = require('../../utils/system');

var _jwt = require('../../utils/jwt');

var _Service2 = require('../Service');

var _UserRepository = require('../../repositories/Admin/UserRepository');

var _encryption = require('../../utils/encryption');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthService = function (_Service) {
    _inherits(AuthService, _Service);

    function AuthService() {
        _classCallCheck(this, AuthService);

        return _possibleConstructorReturn(this, (AuthService.__proto__ || Object.getPrototypeOf(AuthService)).call(this, _UserRepository.UserRepository));
    }

    _createClass(AuthService, [{
        key: 'login',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                var password = _ref2.password,
                    user = _ref2.user;
                var checkPassword, token;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return (0, _encryption.comparePassword)(password, user.password);

                            case 3:
                                checkPassword = _context.sent;

                                if (checkPassword) {
                                    _context.next = 6;
                                    break;
                                }

                                return _context.abrupt('return', (0, _system.jsonError)(_system.errors.PASSWORD_WRONG));

                            case 6:
                                _context.next = 8;
                                return _jwt.Jwt.sign({
                                    id: user.id,
                                    email: user.email
                                });

                            case 8:
                                token = _context.sent;
                                return _context.abrupt('return', (0, _system.jsonSuccess)({ token: token }));

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context['catch'](0);

                                _system.logger.error(new Date().toDateString() + '_ERRORS_ADMIN_LOGIN', _context.t0);
                                return _context.abrupt('return', (0, _system.jsonError)(_system.errors.SYSTEM_ERROR));

                            case 16:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 12]]);
            }));

            function login(_x) {
                return _ref.apply(this, arguments);
            }

            return login;
        }()
    }, {
        key: 'getInfo',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {
                var info;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return this.baseRepository.getOne({ id: user.id, active: true }, {
                                    attributes: {
                                        exclude: ['password']
                                    }
                                });

                            case 3:
                                info = _context2.sent;
                                return _context2.abrupt('return', (0, _system.jsonSuccess)(info));

                            case 7:
                                _context2.prev = 7;
                                _context2.t0 = _context2['catch'](0);

                                _system.logger.error(new Date().toDateString() + '_ERRORS_INFO_USER', _context2.t0);
                                return _context2.abrupt('return', (0, _system.jsonError)(_system.errors.SYSTEM_ERROR));

                            case 11:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 7]]);
            }));

            function getInfo(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getInfo;
        }()
    }, {
        key: 'createUser',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(_ref5) {
                var username = _ref5.username,
                    password = _ref5.password;
                var passwordHash;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return (0, _encryption.hashPassword)(password);

                            case 3:
                                passwordHash = _context3.sent;
                                _context3.next = 6;
                                return this.baseRepository.create({
                                    username: username,
                                    password: passwordHash,
                                    email: 'sangvm2@vnext.com.vn',
                                    role_id: 5,
                                    active: true
                                });

                            case 6:
                                _context3.next = 12;
                                break;

                            case 8:
                                _context3.prev = 8;
                                _context3.t0 = _context3['catch'](0);

                                _system.logger.error(new Date().toDateString() + '_ERRORS_CREATE_USER', _context3.t0);
                                return _context3.abrupt('return', (0, _system.jsonError)(_system.errors.SYSTEM_ERROR));

                            case 12:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 8]]);
            }));

            function createUser(_x3) {
                return _ref4.apply(this, arguments);
            }

            return createUser;
        }()
    }]);

    return AuthService;
}(_Service2.Service);

exports.default = new AuthService();