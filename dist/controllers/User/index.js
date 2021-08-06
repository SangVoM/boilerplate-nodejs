'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prefix = exports.controllers = undefined;

var _AuthController = require('./AuthController');

var prefix = 'user';

var controllers = [_AuthController.AuthController];

exports.controllers = controllers;
exports.prefix = prefix;