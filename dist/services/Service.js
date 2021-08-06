'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Service = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _system = require('../utils/system');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Service = function () {
    function Service(BaseRepository) {
        _classCallCheck(this, Service);

        this.baseRepository = new BaseRepository();
    }

    /**
     * Get list
     * @param {Number} page
     * @param {Number} limit
     *
     */


    _createClass(Service, [{
        key: 'getAll',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(_ref2) {
                var page = _ref2.page,
                    limit = _ref2.limit;
                var result;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return this.baseRepository.getAll({ page: page, limit: limit });

                            case 3:
                                result = _context.sent;
                                return _context.abrupt('return', (0, _system.jsonSuccess)(result));

                            case 7:
                                _context.prev = 7;
                                _context.t0 = _context['catch'](0);
                                throw _context.t0;

                            case 10:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 7]]);
            }));

            function getAll(_x) {
                return _ref.apply(this, arguments);
            }

            return getAll;
        }()

        /**
         * Get by id
         * @param {Number} id
         */

    }, {
        key: 'getById',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(id) {
                var result;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return this.baseRepository.getById(id);

                            case 3:
                                result = _context2.sent;

                                if (!result) {
                                    _context2.next = 6;
                                    break;
                                }

                                return _context2.abrupt('return', (0, _system.jsonSuccess)(result));

                            case 6:
                                return _context2.abrupt('return', (0, _system.jsonError)(_system.errors.NOT_FOUND_ERROR));

                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2['catch'](0);
                                throw _context2.t0;

                            case 12:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[0, 9]]);
            }));

            function getById(_x2) {
                return _ref3.apply(this, arguments);
            }

            return getById;
        }()

        /**
         * Create
         * @param {Object} model
         */

    }, {
        key: 'create',
        value: function () {
            var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(model) {
                var result;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return this.baseRepository.create(model);

                            case 3:
                                result = _context3.sent;
                                return _context3.abrupt('return', (0, _system.jsonSuccess)(result));

                            case 7:
                                _context3.prev = 7;
                                _context3.t0 = _context3['catch'](0);
                                throw _context3.t0;

                            case 10:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 7]]);
            }));

            function create(_x3) {
                return _ref4.apply(this, arguments);
            }

            return create;
        }()

        /**
         * Update by id
         * @param {Number} id
         * @param {Object} model
         */

    }, {
        key: 'updateById',
        value: function () {
            var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(id, model) {
                var result;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;
                                _context4.next = 3;
                                return this.baseRepository.updateById(id, model);

                            case 3:
                                result = _context4.sent;

                                if (result) {
                                    _context4.next = 6;
                                    break;
                                }

                                return _context4.abrupt('return', (0, _system.jsonError)(_system.errors.NOT_FOUND_ERROR));

                            case 6:
                                return _context4.abrupt('return', (0, _system.jsonSuccess)(result));

                            case 9:
                                _context4.prev = 9;
                                _context4.t0 = _context4['catch'](0);
                                throw _context4.t0;

                            case 12:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 9]]);
            }));

            function updateById(_x4, _x5) {
                return _ref5.apply(this, arguments);
            }

            return updateById;
        }()

        /**
         * Delete by id
         * @param {Number} id
         */

    }, {
        key: 'deleteById',
        value: function () {
            var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(id) {
                var deletedRows;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;
                                _context5.next = 3;
                                return this.baseRepository.deleteById(id);

                            case 3:
                                deletedRows = _context5.sent;

                                if (deletedRows) {
                                    _context5.next = 6;
                                    break;
                                }

                                return _context5.abrupt('return', (0, _system.jsonError)(_system.errors.NOT_FOUND_ERROR));

                            case 6:
                                return _context5.abrupt('return', (0, _system.jsonSuccess)());

                            case 9:
                                _context5.prev = 9;
                                _context5.t0 = _context5['catch'](0);
                                throw _context5.t0;

                            case 12:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 9]]);
            }));

            function deleteById(_x6) {
                return _ref6.apply(this, arguments);
            }

            return deleteById;
        }()

        /**
         * Delete using condition
         * @param {Object} condition
         */

    }, {
        key: 'delete',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(condition) {
                var deletedRows;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return this.baseRepository.delete(condition);

                            case 3:
                                deletedRows = _context6.sent;

                                if (deletedRows) {
                                    _context6.next = 6;
                                    break;
                                }

                                return _context6.abrupt('return', (0, _system.jsonError)(_system.errors.NOT_FOUND_ERROR));

                            case 6:
                                return _context6.abrupt('return', (0, _system.jsonSuccess)());

                            case 9:
                                _context6.prev = 9;
                                _context6.t0 = _context6['catch'](0);
                                throw _context6.t0;

                            case 12:
                            case 'end':
                                return _context6.stop();
                        }
                    }
                }, _callee6, this, [[0, 9]]);
            }));

            function _delete(_x7) {
                return _ref7.apply(this, arguments);
            }

            return _delete;
        }()
    }]);

    return Service;
}();

exports.Service = Service;