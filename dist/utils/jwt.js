'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Jwt = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _system = require('./system');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jwt = function () {
    function Jwt() {
        _classCallCheck(this, Jwt);
    }

    _createClass(Jwt, null, [{
        key: 'sign',
        value: function sign(data) {
            return new Promise(function (resolve, reject) {
                _jsonwebtoken2.default.sign(data, getEnv('JWT_SECRET'), { expiresIn: getEnv('JWT_EXPIRE_TIME') }, function (err, token) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(token);
                    }
                });
            });
        }
    }, {
        key: 'verify',
        value: function verify(bearer) {
            return new Promise(function (resolve) {
                var token = void 0;

                var _bearer$split = bearer.split(' '),
                    _bearer$split2 = _slicedToArray(_bearer$split, 2),
                    scheme = _bearer$split2[0],
                    credential = _bearer$split2[1];

                if (/^Bearer$/i.test(scheme) && credential) {
                    token = credential;
                } else {
                    return resolve((0, _system.jsonError)(_system.errors.INVALID_TOKEN));
                }

                _jsonwebtoken2.default.verify(token, getEnv('JWT_SECRET'), function (error, decode) {
                    if (error) {
                        switch (error.message) {
                            case 'jwt expired':
                                error = _system.errors.TOKEN_EXPIRED_ERROR;
                                break;

                            default:
                                error = _system.errors.INVALID_TOKEN;
                        }

                        return resolve((0, _system.jsonError)(error));
                    }
                    return resolve((0, _system.jsonSuccess)(decode));
                });
            });
        }
    }]);

    return Jwt;
}();

exports.Jwt = Jwt;