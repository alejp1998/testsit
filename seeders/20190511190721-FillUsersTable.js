'use strict';

var crypt = require('../helpers/crypt');

module.exports = {
  up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        email: 'admin@alumnos.upm.es',
        password: crypt.encryptPassword('admin1234','aaaa'),
        salt: 'aaaa',
        isAdmin: true,
        isEditor: true,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        username: 'ale',
        email: 'ale@alumnos.upm.es',
        password: crypt.encryptPassword('ale1234','bbbb'),
        salt: 'bbbb',
        isAdmin: true,
        isEditor: true,
        createdAt: new Date(), updatedAt: new Date()
      }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
