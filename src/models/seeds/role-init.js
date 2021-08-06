module.exports = {
    up: (queryInterface, Sequelize) => {
        const RolePermissions = ['ADMIN', 'USER'];
        const data = RolePermissions.map(elem => {
            return { name: elem, permissions: elem };
        });
        console.log('data: ', data);
        return queryInterface.bulkInsert('roles', data);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('roles', null, {});
    }
};
