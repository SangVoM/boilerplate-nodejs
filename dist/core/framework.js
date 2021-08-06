'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.services = exports.schemas = exports.environments = undefined;

var _Role = require('../models/schema/Role');

var _User = require('../models/schema/User');

var environments = ['LCL'];


//Redis, Elasticsearch, AWS
var services = {};

// Add schema
var schemas = {
    RoleSchema: _Role.s,
    UserSchema: _User.s
};

exports.environments = environments;
exports.schemas = schemas;
exports.services = services;