'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userControllers = exports.adminControllers = undefined;

var _Admin = require('./Admin');

var adminControllers = _interopRequireWildcard(_Admin);

var _User = require('./User');

var userControllers = _interopRequireWildcard(_User);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.adminControllers = adminControllers;
exports.userControllers = userControllers;