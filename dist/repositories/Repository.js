'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Repository = function () {
    function Repository(model) {
        _classCallCheck(this, Repository);

        this.model = model;
    }

    /**
     *
     * @param {Number} id
     * @param {Object} include
     * @param {Object} attributes
     */


    _createClass(Repository, [{
        key: 'getById',
        value: function () {
            var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id) {
                var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                    _ref2$include = _ref2.include,
                    include = _ref2$include === undefined ? [] : _ref2$include,
                    _ref2$attributes = _ref2.attributes,
                    attributes = _ref2$attributes === undefined ? {} : _ref2$attributes;

                var model;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                _context.prev = 0;
                                _context.next = 3;
                                return this.model.findByPk(id, {
                                    include: include,
                                    attributes: attributes
                                });

                            case 3:
                                model = _context.sent;


                                if (model) {
                                    model = model.get({ plain: true });
                                }

                                return _context.abrupt('return', model);

                            case 8:
                                _context.prev = 8;
                                _context.t0 = _context['catch'](0);
                                throw _context.t0;

                            case 11:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[0, 8]]);
            }));

            function getById(_x) {
                return _ref.apply(this, arguments);
            }

            return getById;
        }()

        /**
         *
         * @param {Object} condition object to find
         * @param {Object} include
         * @param {Object} attributes
         */

    }, {
        key: 'getOne',
        value: function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(condition) {
                var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                    _ref4$include = _ref4.include,
                    include = _ref4$include === undefined ? [] : _ref4$include,
                    _ref4$attributes = _ref4.attributes,
                    attributes = _ref4$attributes === undefined ? {} : _ref4$attributes;

                var model;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.prev = 0;

                                if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                                    condition.deleted = false;
                                }

                                _context2.next = 4;
                                return this.model.findOne({
                                    where: condition,
                                    include: include,
                                    attributes: attributes
                                });

                            case 4:
                                model = _context2.sent;


                                if (model) {
                                    model = model.get({ plain: true });
                                }

                                return _context2.abrupt('return', model);

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

            function getOne(_x3) {
                return _ref3.apply(this, arguments);
            }

            return getOne;
        }()

        /**
         *
         * @param {Number} page
         * @param {Number} limit
         * @param {Object} condition
         * @param {Object[]} include
         * @param {Object[]} order
         */

    }, {
        key: 'getAll',
        value: function getAll(_ref5) {
            var page = _ref5.page,
                limit = _ref5.limit,
                _ref5$condition = _ref5.condition,
                condition = _ref5$condition === undefined ? {} : _ref5$condition,
                _ref5$include = _ref5.include,
                include = _ref5$include === undefined ? [] : _ref5$include,
                attributes = _ref5.attributes,
                _ref5$order = _ref5.order,
                order = _ref5$order === undefined ? [['id', 'DESC']] : _ref5$order;

            if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                condition.deleted = false;
            }

            /** Option to query */
            var options = {
                order: order,
                where: condition,
                include: include,
                distinct: true
            };

            if (attributes) {
                options.attributes = attributes;
            }

            if (limit && page) {
                options.limit = limit;
                options.offset = (page - 1) * limit;
            }

            return this.model.findAndCountAll(options);
        }

        /**
         *
         * @param {Object} condition
         * @param {Object[]} include
         * @param {Object[]} order
         */

    }, {
        key: 'findAll',
        value: function findAll() {
            var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref6$condition = _ref6.condition,
                condition = _ref6$condition === undefined ? {} : _ref6$condition,
                _ref6$include = _ref6.include,
                include = _ref6$include === undefined ? [] : _ref6$include,
                _ref6$group = _ref6.group,
                group = _ref6$group === undefined ? [] : _ref6$group,
                attributes = _ref6.attributes,
                _ref6$raw = _ref6.raw,
                raw = _ref6$raw === undefined ? false : _ref6$raw,
                _ref6$order = _ref6.order,
                order = _ref6$order === undefined ? null : _ref6$order,
                _ref6$limit = _ref6.limit,
                limit = _ref6$limit === undefined ? null : _ref6$limit;

            if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                condition.deleted = false;
            }

            /** Option to query */
            var options = {
                order: order,
                where: condition,
                include: include,
                distinct: true,
                raw: raw
            };

            if (group.length > 0) {
                options.group = group;
            }

            if (attributes) {
                options.attributes = attributes;
            }

            if (+limit) {
                options.limit = +limit;
            }

            return this.model.findAll(options);
        }

        /**
         *
         * @param {Number} id
         * @param {Object} attributes
         */

    }, {
        key: 'updateById',
        value: function () {
            var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, attributes) {
                var transaction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var foundModel;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.prev = 0;
                                _context3.next = 3;
                                return this.model.findByPk(id);

                            case 3:
                                foundModel = _context3.sent;

                                if (!foundModel) {
                                    _context3.next = 9;
                                    break;
                                }

                                _context3.next = 7;
                                return foundModel.update(attributes, { transaction: transaction });

                            case 7:
                                foundModel = _context3.sent;

                                foundModel = foundModel.get({ plain: true });

                            case 9:
                                return _context3.abrupt('return', foundModel);

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](0);
                                throw _context3.t0;

                            case 15:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[0, 12]]);
            }));

            function updateById(_x6, _x7) {
                return _ref7.apply(this, arguments);
            }

            return updateById;
        }()

        /**
         *
         * @param {Object} attributes attributes to be updated
         * @param {Object} condition Condition to find
         */

    }, {
        key: 'updateOne',
        value: function () {
            var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(attributes, condition) {
                var transaction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var foundModel;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.prev = 0;

                                if (this.model.rawAttributes && this.model.rawAttributes.updated_at) {
                                    attributes.updated_at = new Date();
                                }

                                _context4.next = 4;
                                return this.model.findOne({ where: condition });

                            case 4:
                                foundModel = _context4.sent;

                                if (!foundModel) {
                                    _context4.next = 10;
                                    break;
                                }

                                _context4.next = 8;
                                return foundModel.update(attributes, { transaction: transaction });

                            case 8:
                                foundModel = _context4.sent;

                                foundModel = foundModel.get({ plain: true });

                            case 10:
                                return _context4.abrupt('return', foundModel);

                            case 13:
                                _context4.prev = 13;
                                _context4.t0 = _context4['catch'](0);
                                throw _context4.t0;

                            case 16:
                            case 'end':
                                return _context4.stop();
                        }
                    }
                }, _callee4, this, [[0, 13]]);
            }));

            function updateOne(_x9, _x10) {
                return _ref8.apply(this, arguments);
            }

            return updateOne;
        }()

        /**
         *
         * @param {Object} attributes attributes to be updated
         * @param {Object} model model to update
         * @param {Object} condition Condition to find
         */

    }, {
        key: 'updateOneByModel',
        value: function () {
            var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(model, attributes) {
                var transaction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.prev = 0;

                                if (this.model.rawAttributes && this.model.rawAttributes.updated_at) {
                                    attributes.updated_at = new Date();
                                }

                                // Check model exist

                                if (!model) {
                                    _context5.next = 7;
                                    break;
                                }

                                _context5.next = 5;
                                return model.update(attributes, { transaction: transaction });

                            case 5:
                                model = _context5.sent;

                                model = model.get({ plain: true });

                            case 7:
                                return _context5.abrupt('return', model);

                            case 10:
                                _context5.prev = 10;
                                _context5.t0 = _context5['catch'](0);
                                throw _context5.t0;

                            case 13:
                            case 'end':
                                return _context5.stop();
                        }
                    }
                }, _callee5, this, [[0, 10]]);
            }));

            function updateOneByModel(_x12, _x13) {
                return _ref9.apply(this, arguments);
            }

            return updateOneByModel;
        }()

        /**
         *
         * @param {Object} condition Condition to find
         * @param {Object} attributes attributes to be updated
         */

    }, {
        key: 'update',
        value: function () {
            var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(condition, attributes) {
                var transaction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
                var foundModels;
                return regeneratorRuntime.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.prev = 0;
                                _context6.next = 3;
                                return this.model.update(attributes, { where: condition, transaction: transaction });

                            case 3:
                                _context6.next = 5;
                                return this.model.findAll({ where: condition, raw: true });

                            case 5:
                                foundModels = _context6.sent;
                                return _context6.abrupt('return', foundModels);

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

            function update(_x15, _x16) {
                return _ref10.apply(this, arguments);
            }

            return update;
        }()

        /**
         *
         * @param {Number} id
         */

    }, {
        key: 'deleteById',
        value: function deleteById(id) {
            var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                return this.updateOne({ deleted: true }, { id: id }, transaction);
            }

            return this.model.destroy({
                where: {
                    id: id
                },
                transaction: transaction
            });
        }

        /**
         *
         * @param {Object} condition
         */

    }, {
        key: 'delete',
        value: function _delete(condition) {
            var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

            if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                // return this.updateOne({ deleted: true }, condition, transaction);
                return this.update(condition, { deleted: true }, transaction);
            }

            return this.model.destroy({ where: condition, transaction: transaction });
        }

        /**
         *
         * @param {Object} attributes
         */

    }, {
        key: 'create',
        value: function () {
            var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(attributes) {
                var transaction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
                var nowDate, model;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.prev = 0;
                                nowDate = new Date();

                                if (this.model.rawAttributes && this.model.rawAttributes.created_at) {
                                    attributes.created_at = nowDate;
                                }

                                if (this.model.rawAttributes && this.model.rawAttributes.updated_at) {
                                    attributes.updated_at = nowDate;
                                }

                                if (this.model.rawAttributes && this.model.rawAttributes.deleted) {
                                    attributes.deleted = false;
                                }

                                _context7.next = 7;
                                return this.model.create(attributes, { transaction: transaction });

                            case 7:
                                model = _context7.sent;
                                return _context7.abrupt('return', model.get({ plain: true }));

                            case 11:
                                _context7.prev = 11;
                                _context7.t0 = _context7['catch'](0);
                                throw _context7.t0;

                            case 14:
                            case 'end':
                                return _context7.stop();
                        }
                    }
                }, _callee7, this, [[0, 11]]);
            }));

            function create(_x20) {
                return _ref11.apply(this, arguments);
            }

            return create;
        }()

        /**
         *
         * @param {Array} arr là mảng các object data
         */

    }, {
        key: 'bulkCreate',
        value: function () {
            var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(arr, transaction) {
                var include = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
                return regeneratorRuntime.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.prev = 0;
                                return _context8.abrupt('return', this.model.bulkCreate(arr, { include: include, transaction: transaction }));

                            case 4:
                                _context8.prev = 4;
                                _context8.t0 = _context8['catch'](0);
                                throw _context8.t0;

                            case 7:
                            case 'end':
                                return _context8.stop();
                        }
                    }
                }, _callee8, this, [[0, 4]]);
            }));

            function bulkCreate(_x22, _x23) {
                return _ref12.apply(this, arguments);
            }

            return bulkCreate;
        }()

        /**
         *
         * @param {Array} arr là mảng các object data
         */

    }, {
        key: 'bulkUpdate',
        value: function () {
            var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(arr, attributes, transaction) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while (1) {
                        switch (_context9.prev = _context9.next) {
                            case 0:
                                _context9.prev = 0;
                                return _context9.abrupt('return', this.model.bulkCreate(arr, { updateOnDuplicate: attributes, transaction: transaction }));

                            case 4:
                                _context9.prev = 4;
                                _context9.t0 = _context9['catch'](0);
                                throw _context9.t0;

                            case 7:
                            case 'end':
                                return _context9.stop();
                        }
                    }
                }, _callee9, this, [[0, 4]]);
            }));

            function bulkUpdate(_x25, _x26, _x27) {
                return _ref13.apply(this, arguments);
            }

            return bulkUpdate;
        }()
    }]);

    return Repository;
}();

exports.Repository = Repository;