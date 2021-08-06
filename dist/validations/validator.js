'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Validator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expressValidator = require('express-validator');

var _system = require('../utils/system');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Validator = function () {
    function Validator() {
        _classCallCheck(this, Validator);
    }

    _createClass(Validator, null, [{
        key: 'check',

        /**
         * Express validator middleware
         */
        value: function check() {
            return function (req, res, next) {
                var errors = (0, _expressValidator.validationResult)(req);

                if (errors.isEmpty()) {
                    return next();
                }

                var errorMsg = errors.array()[0].msg;

                res.json((0, _system.jsonError)(errorMsg));
            };
        }
    }]);

    return Validator;
}();

exports.Validator = Validator;