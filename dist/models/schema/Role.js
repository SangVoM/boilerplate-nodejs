'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Role = void 0;

var RolePermissions = {
    ADMIN: 'ADMIN',
    USER: 'USER'
};

var s = function s(builder, Sequelize) {
    exports.Role = Role = builder.define('role', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        permissions: {
            type: Sequelize.INTEGER,
            enum: Object.values(RolePermissions)
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false
        }
    }, {
        timestamps: false
    });
    return Role;
};

exports.Role = Role;
exports.s = s;
exports.RolePermissions = RolePermissions;