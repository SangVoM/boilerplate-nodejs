'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = {
    up: function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(queryInterface, Sequelize) {
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            return _context.abrupt('return', queryInterface.createTable('users', {
                                id: {
                                    type: Sequelize.INTEGER,
                                    primaryKey: true,
                                    autoIncrement: true,
                                    allowNull: false
                                },
                                username: {
                                    type: Sequelize.STRING
                                },
                                email: {
                                    type: Sequelize.STRING,
                                    allowNull: false
                                },
                                password: {
                                    type: Sequelize.STRING,
                                    allowNull: false
                                },
                                active: {
                                    type: Sequelize.BOOLEAN,
                                    allowNull: false
                                },
                                role_id: {
                                    type: Sequelize.INTEGER,
                                    allowNull: false,
                                    references: {
                                        model: 'roles',
                                        key: 'id'
                                    },
                                    onDelete: 'CASCADE'
                                },
                                deleted: {
                                    type: Sequelize.BOOLEAN,
                                    allowNull: false,
                                    defaultValue: false
                                },
                                created_at: {
                                    type: Sequelize.DATE,
                                    allowNull: false,
                                    defaultValue: Sequelize.fn('NOW')
                                },
                                updated_at: {
                                    type: Sequelize.DATE,
                                    allowNull: false,
                                    defaultValue: Sequelize.fn('NOW')
                                }
                            }, {
                                charset: 'utf8',
                                collate: 'utf8_general_ci'
                            }));

                        case 1:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function up(_x, _x2) {
            return _ref.apply(this, arguments);
        };
    }(),

    down: function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(queryInterface, Sequelize) {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            return _context2.abrupt('return', queryInterface.dropTable('users'));

                        case 1:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function down(_x3, _x4) {
            return _ref2.apply(this, arguments);
        };
    }()
};