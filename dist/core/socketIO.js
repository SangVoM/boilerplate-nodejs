'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _socket = require('socket.io-redis');

var _socket2 = _interopRequireDefault(_socket);

var _socketioJwt = require('socketio-jwt');

var _socketioJwt2 = _interopRequireDefault(_socketioJwt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var options = {
    // pingInterval: 2000,
    // pingTimeout: 2000,
    transports: ['websocket']
};


var socketIO = function socketIO(http) {
    try {
        console.log('Realtime system');
        // Config socket server.
        var io = require('socket.io')(http, options);
        io.adapter((0, _socket2.default)({ host: getEnv('REDIS_HOST'), port: getEnv('REDIS_PORT') }, {}));

        // Setting Socket IO JWT.
        io.use(_socketioJwt2.default.authorize({
            secret: getEnv('APP_KEY'),
            handshake: true
        }));
        console.log('pass socket jwt');
        // Connect socket.
        io.use(function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(socket, next) {
                var user;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                console.log('socket', socket);
                                user = socket.decoded_token;

                                user._id = user.sub;
                                if (!user) {
                                    socket.emit('auAuthorization', 'not_authentication');
                                    socket.disconnect();
                                }

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function (_x, _x2) {
                return _ref.apply(this, arguments);
            };
        }()).on('connect', function () {
            var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(socket) {
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                console.log('Welcome to server: ' + socket.id);

                            case 1:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            return function (_x3) {
                return _ref2.apply(this, arguments);
            };
        }()).on('disconnect', function () {
            console.log("[CONNECTION] disconnected!");
        });
    } catch (e) {
        console.log("[CONNECTION] connection failed! " + e);
    }
};
exports.default = socketIO;