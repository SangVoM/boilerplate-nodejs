'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _framework = require('./core/framework');

var _boot = require('./core/boot');

var _config = require('./core/config');

var _system = require('./utils/system');

var _regulators = require('./middleware/regulators');

var _limitRequest = require('./core/limitRequest');

var _limitRequest2 = _interopRequireDefault(_limitRequest);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _socketIO = require('./core/socketIO');

var _socketIO2 = _interopRequireDefault(_socketIO);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var awaitResult, keys, shutdownProcess, _env, i, s, app, listener, session, _i, fileUpload, bodyParser, settings, _i3, controllers, http, port;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    awaitResult = void 0;
                    keys = void 0;

                    //-- handle signals

                    shutdownProcess = function () {
                        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
                            return regeneratorRuntime.wrap(function _callee$(_context) {
                                while (1) {
                                    switch (_context.prev = _context.next) {
                                        case 0:
                                            if (global.isShuttingDown) {
                                                _context.next = 12;
                                                break;
                                            }

                                            global.isShuttingDown = true;
                                            _context.next = 4;
                                            return (0, _boot.preExit)();

                                        case 4:
                                            awaitResult = _context.sent;

                                            if (awaitResult && !awaitResult.success) _system.logger.warn(awaitResult);

                                            _context.next = 8;
                                            return (0, _boot.exit)();

                                        case 8:
                                            awaitResult = _context.sent;

                                            if (awaitResult && !awaitResult.success) _system.logger.warn(awaitResult);
                                            _system.logger.info('All services stopped. Server exited.');
                                            return _context.abrupt('return', process.exit());

                                        case 12:
                                        case 'end':
                                            return _context.stop();
                                    }
                                }
                            }, _callee, undefined);
                        }));

                        return function shutdownProcess() {
                            return _ref2.apply(this, arguments);
                        };
                    }();

                    process.on('SIGTERM', function () {
                        _system.logger.warn('interrupt signal');
                        return shutdownProcess();
                    });
                    process.on('SIGINT', function () {
                        _system.logger.warn('interrupt signal');
                        return shutdownProcess();
                    });
                    process.on('uncaughtException', function (err) {
                        console.log(err);
                        _system.logger.error('uncaughtException');
                        return shutdownProcess();
                    });
                    process.on('unhandledRejection', function (reason, p) {
                        console.log(reason, p);
                        _system.logger.error('unhandledRejection');
                        return shutdownProcess();
                    });

                    //-- load env

                    if (!(!_framework.environments || _framework.environments.length === 0)) {
                        _context2.next = 10;
                        break;
                    }

                    _system.logger.error('At least one environment must be set');
                    throw (0, _system.jsonError)(_system.errors.SYSTEM_ERROR);

                case 10:

                    global.env = process.env.NODE_ENV || 'LCL';

                    if (!(_framework.environments.indexOf(global.env) < 0)) {
                        _context2.next = 14;
                        break;
                    }

                    _system.logger.error('Environment not found');
                    throw _system.errors.SYSTEM_ERROR;

                case 14:
                    _context2.prev = 14;
                    _env = _dotenv2.default.parse(_fs2.default.readFileSync(_path2.default.join(__dirname, '../env/' + global.env + '.env')));

                    process.env = Object.assign({}, _env, process.env);
                    _system.logger.info('Current environment: ' + global.env);
                    _context2.next = 24;
                    break;

                case 20:
                    _context2.prev = 20;
                    _context2.t0 = _context2['catch'](14);

                    _system.logger.error('File not found: ' + env + '.env');
                    throw _system.errors.SYSTEM_ERROR;

                case 24:
                    global.getEnv = function (key, defaultValue) {
                        key = global.env + '_' + key;
                        if (process.env[key] !== null && process.env[key] !== undefined) {
                            return process.env[key];
                        } else if (defaultValue !== undefined) {
                            return defaultValue;
                        } else {
                            _system.logger.error(key);
                            throw _system.errors.ENV_NOT_SET_ERROR;
                        }
                    };

                    _system.logger.verbose('Pre-booting...');
                    //-- pre-boot and load models
                    _context2.next = 28;
                    return (0, _boot.preBoot)();

                case 28:
                    awaitResult = _context2.sent;

                    if (awaitResult.success) {
                        _context2.next = 31;
                        break;
                    }

                    throw awaitResult.error;

                case 31:

                    //-- boot the services
                    keys = Object.keys(_framework.services);
                    i = 0;

                case 33:
                    if (!(i < keys.length)) {
                        _context2.next = 46;
                        break;
                    }

                    s = _framework.services[keys[i]];

                    if (!s.boot) {
                        _context2.next = 43;
                        break;
                    }

                    _system.logger.verbose(s.name + ' booting');
                    _context2.next = 39;
                    return s.boot();

                case 39:
                    awaitResult = _context2.sent;

                    if (!(awaitResult && !awaitResult.success)) {
                        _context2.next = 42;
                        break;
                    }

                    throw awaitResult.error;

                case 42:
                    _system.logger.verbose(s.name + ' boot completed');

                case 43:
                    i++;
                    _context2.next = 33;
                    break;

                case 46:
                    _context2.next = 48;
                    return (0, _boot.boot)();

                case 48:
                    awaitResult = _context2.sent;

                    if (awaitResult.success) {
                        _context2.next = 51;
                        break;
                    }

                    throw awaitResult.error;

                case 51:

                    //-- create server and apply configs
                    app = (0, _express2.default)();

                    app.set('views', _path2.default.join(__dirname, './views'));
                    app.set('view engine', 'ejs');
                    app.get('/', function (req, res) {
                        res.render('index');
                    });
                    listener = app;


                    app.use(function (req, res, next) {
                        if (global.isShuttingDown) return res.json((0, _system.jsonError)(_system.errors.SERVER_SHUTTING_DOWN));
                        return next();
                    });

                    if (_config.config.session && _config.config.session.enabled) {
                        session = require('express-session');

                        app.use(session(_config.config.session.settings));
                    }

                    if (_config.config.static && _config.config.static.enabled && _config.config.static.settings && _config.config.static.settings.length) {
                        for (_i = 0; _i < _config.config.static.settings.length; _i++) {
                            app.use(_config.config.static.settings[_i].mount, _express2.default.static(_config.config.static.settings[_i].root, _config.config.static.settings[_i].options));
                        }
                    }

                    if (_config.config.fileUpload && _config.config.fileUpload.enabled) {
                        fileUpload = require('express-fileupload');

                        app.use(fileUpload(_config.config.fileUpload.settings));
                    }

                    if (_config.config.bodyParser && _config.config.bodyParser.enabled) {
                        bodyParser = require('body-parser');

                        if (_config.config.bodyParser.settings.json && _config.config.bodyParser.settings.json.enabled) app.use(bodyParser.json(_config.config.bodyParser.settings.json.settings));
                        if (_config.config.bodyParser.settings.urlencoded && _config.config.bodyParser.settings.urlencoded.enabled) app.use(bodyParser.urlencoded(_config.config.bodyParser.settings.urlencoded.settings));
                    }

                    /** limit request: 100 request/1minute  */
                    app.use(_limitRequest2.default);
                    /** security header with helmet https://helmetjs.github.io/docs/ */
                    app.use((0, _helmet2.default)());

                    if (_config.config.CORS && _config.config.CORS.enabled) {
                        settings = Object.keys(_config.config.CORS.settings).map(function (key) {
                            return [key, _config.config.CORS.settings[key]];
                        });

                        app.use(function (req, res, next) {
                            for (var _i2 = 0; _i2 < settings.length; _i2++) {
                                res.header(settings[_i2][0], settings[_i2][1]);
                            }
                            next();
                        });
                    }

                    //-- apply middleware
                    if (_regulators.regulators && _regulators.regulators.length) {
                        for (_i3 = 0; _i3 < _regulators.regulators.length; _i3++) {
                            app.use(_regulators.regulators[_i3]);
                        }
                    }

                    //-- load controllers
                    controllers = require('./controllers');

                    Object.keys(controllers).forEach(function (g) {
                        _system.logger.verbose('Mounting controller group: ' + g);
                        controllers[g].controllers.forEach(function (c) {
                            app.use((controllers[g].prefix ? '/' + controllers[g].prefix : '') + '/' + (c.base || ''), c);
                        });
                    });

                    http = require('http').Server(app);

                    (0, _socketIO2.default)(http);

                    //-- start server
                    port = getEnv('API_PORT');
                    _context2.next = 72;
                    return new Promise(function (resolve, reject) {
                        listener.listen(port, function (err) {
                            if (err) return reject(err);
                            return resolve((0, _system.jsonSuccess)());
                        }).on('error', function () {
                            reject((0, _system.jsonError)(_system.errors.LISTEN_ERROR));
                        });
                    });

                case 72:
                    awaitResult = _context2.sent;

                    if (awaitResult.success) {
                        _context2.next = 75;
                        break;
                    }

                    throw awaitResult.error;

                case 75:

                    /** Setting default timezone of moment */
                    _moment2.default.tz.setDefault(getEnv('TIMEZONE'));

                    return _context2.abrupt('return', { port: port });

                case 77:
                case 'end':
                    return _context2.stop();
            }
        }
    }, _callee2, undefined, [[14, 20]]);
}))().then(function (result) {
    _system.logger.info('Server bootstrapped. Listening at port: ' + result.port);
}).catch(function (err) {
    console.log('ERROR START SERVER: ', err);
    _system.logger.error(err);
    process.exit();
});