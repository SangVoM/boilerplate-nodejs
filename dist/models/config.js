'use strict';

module.exports = {
    LCL: {
        username: process.env['LCL_MYSQL_USER'],
        password: process.env['LCL_MYSQL_PASS'],
        database: process.env['LCL_MYSQL_DB'],
        host: process.env['LCL_MYSQL_HOST'],
        logging: false,
        dialect: 'mysql'
    }
};