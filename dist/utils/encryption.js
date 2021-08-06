'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.comparePassword = exports.hashPassword = undefined;

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var hashPassword = function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(password) {
        var salt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return _bcrypt2.default.genSalt(Number(getEnv('SALT_ROUND')));

                    case 3:
                        salt = _context.sent;
                        return _context.abrupt('return', _bcrypt2.default.hash(password, salt));

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);
                        throw _context.t0;

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function hashPassword(_x) {
        return _ref.apply(this, arguments);
    };
}();

var comparePassword = function comparePassword(password, passwordHash) {
    try {
        return _bcrypt2.default.compare(password, passwordHash);
    } catch (e) {
        throw e;
    }
};

exports.hashPassword = hashPassword;
exports.comparePassword = comparePassword;