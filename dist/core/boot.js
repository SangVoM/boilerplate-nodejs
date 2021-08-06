'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.textAttrs = exports.sequelize = exports.exit = exports.preExit = exports.boot = exports.preBoot = undefined;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _child_process = require('child_process');

var _system = require('../utils/system');

var _framework = require('./framework');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var sequelize = void 0;
var textAttrs = [];
var preBoot = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var mysqlResult, sequelizeModels, keys, i, schema, model, _i;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        //-- this boot runs before any services' boot, we can connect database here

                        _system.logger.verbose('Creating database if not existed...');
                        //-- create database in mysql if not existed
                        _context.next = 3;
                        return new Promise(function (resolve) {
                            (0, _child_process.exec)('./node_modules/.bin/sequelize --config=' + _path2.default.join(__dirname, '../models/config.js') + ' --models-path=' + _path2.default.join(__dirname, '../models/schema') + ' --migrations-path=' + _path2.default.join(__dirname, '../models/migrations') + ' db:create --env=' + global.env + ' --charset=utf8 --collate=utf8_unicode_ci', { env: process.env }, function (err) {
                                if (err) {
                                    _system.logger.verbose(err);
                                }
                                return resolve();
                            });
                        });

                    case 3:
                        _system.logger.verbose('Database OK');

                        _system.logger.verbose('Connecting to mysql...');
                        _context.next = 7;
                        return new Promise(function (resolve) {
                            var sequelizeConfig = require(_path2.default.join(__dirname, '../models/config.js'))[global.env];
                            exports.sequelize = sequelize = new _sequelize2.default(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, Object.assign({}, sequelizeConfig, {
                                // operatorsAliases: Sequelize.Op,
                                dialectOptions: { decimalNumbers: true }
                            }));
                            sequelize.authenticate().then(function (err) {
                                if (err) {
                                    _system.logger.error('Mysql connection error', err);
                                    return resolve((0, _system.jsonError)(_system.errors.SYSTEM_ERROR));
                                }
                                return resolve((0, _system.jsonSuccess)(sequelize));
                            });
                        });

                    case 7:
                        mysqlResult = _context.sent;

                        if (mysqlResult.success) {
                            _context.next = 10;
                            break;
                        }

                        return _context.abrupt('return', mysqlResult);

                    case 10:
                        _system.logger.verbose('Connected to mysql');

                        exports.sequelize = sequelize = mysqlResult.result;
                        // -- run sql migration
                        _context.next = 14;
                        return new Promise(function (resolve, reject) {
                            _system.logger.verbose('Migrating database...');
                            (0, _child_process.exec)('./node_modules/.bin/sequelize --config=' + _path2.default.join(__dirname, '../models/config.js') + ' --models-path=' + _path2.default.join(__dirname, '../models/schema') + ' --migrations-path=' + _path2.default.join(__dirname, '../models/migrations') + ' db:migrate --env=' + global.env, { env: process.env }, function (err) {
                                if (err) {
                                    console.log(err);
                                    return reject();
                                }
                                _system.logger.verbose('Database migration succeeded');
                                return resolve();
                            });
                        });

                    case 14:

                        //-- load models
                        sequelizeModels = {};

                        _system.logger.verbose('Loading models...');
                        keys = Object.keys(_framework.schemas);
                        i = 0;

                    case 18:
                        if (!(i < keys.length)) {
                            _context.next = 36;
                            break;
                        }

                        _system.logger.verbose('Loading schema ' + keys[i] + '...');
                        //-- in reality we either use mongo or sequelize, not both, do we don't check
                        // the function name
                        schema = _framework.schemas[keys[i]];

                        if (schema) {
                            _context.next = 24;
                            break;
                        }

                        _system.logger.error('Cannot load ' + keys[i] + ', please make sure you include the schema in framework');
                        return _context.abrupt('return', (0, _system.jsonError)(_system.errors.SYSTEM_ERROR));

                    case 24:
                        model = void 0;
                        _context.t0 = schema.name;
                        _context.next = _context.t0 === 'm' ? 28 : _context.t0 === 's' ? 30 : 33;
                        break;

                    case 28:
                        model = schema(mongoResult.result, mongoose);
                        return _context.abrupt('break', 33);

                    case 30:
                        model = schema(mysqlResult.result, _sequelize2.default);
                        sequelizeModels[model.name] = model;
                        return _context.abrupt('break', 33);

                    case 33:
                        i++;
                        _context.next = 18;
                        break;

                    case 36:

                        keys = Object.keys(sequelizeModels);
                        for (_i = 0; _i < keys.length; _i++) {
                            _system.logger.verbose('Associating model ' + keys[_i] + '...');
                            if (sequelizeModels[keys[_i]].associate) {
                                sequelizeModels[keys[_i]].associate(sequelizeModels);
                            }
                        }

                        return _context.abrupt('return', (0, _system.jsonSuccess)());

                    case 39:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function preBoot() {
        return _ref.apply(this, arguments);
    };
}();
var boot = function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        return _context2.abrupt('return', (0, _system.jsonSuccess)());

                    case 1:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function boot() {
        return _ref2.apply(this, arguments);
    };
}();
var preExit = function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        return _context3.abrupt('return', (0, _system.jsonSuccess)());

                    case 1:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function preExit() {
        return _ref3.apply(this, arguments);
    };
}();
var exit = function () {
    var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        return _context4.abrupt('return', (0, _system.jsonSuccess)());

                    case 1:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function exit() {
        return _ref4.apply(this, arguments);
    };
}();

exports.preBoot = preBoot;
exports.boot = boot;
exports.preExit = preExit;
exports.exit = exit;
exports.sequelize = sequelize;
exports.textAttrs = textAttrs;