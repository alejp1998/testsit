'use strict';

var crypt = require('../helpers/crypt');

module.exports = {
  up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('users', [
      {
        username: 'admin',
        password: crypt.encryptPassword('admin1234','aaaa'),
        salt: 'aaaa',
        isAdmin: true,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        username: 'ale',
        password: crypt.encryptPassword('ale1234','bbbb'),
        salt: 'bbbb',
        isAdmin: true,
        createdAt: new Date(), updatedAt: new Date()
      }
    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
