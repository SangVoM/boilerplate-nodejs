'use strict';

module.exports = {
    up: function up(queryInterface, Sequelize) {
        var RolePermissions = ['ADMIN', 'USER'];
        var data = RolePermissions.map(function (elem) {
            return { name: elem, permissions: elem };
        });
        console.log('data: ', data);
        return queryInterface.bulkInsert('roles', data);
    },
    down: function down(queryInterface, Sequelize) {
        return queryInterface.bulkDelete('roles', null, {});
    }
};