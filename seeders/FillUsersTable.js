'use strict';

var crypt = require('../helpers/crypt');

module.exports = {
  up(queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Users', [
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
      },
      {
        username: 'rocio',
        email: 'rocio@alumnos.upm.es',
        password: crypt.encryptPassword('rocio1234','cccc'),
        salt: 'cccc',
        isAdmin: false,
        isEditor: true,
        createdAt: new Date(), updatedAt: new Date()
      },
      {
        username: 'mamado',
        email: 'mamado@alumnos.upm.es',
        password: crypt.encryptPassword('mamado1234','dddd'),
        salt: 'cccc',
        isAdmin: false,
        isEditor: false,
        createdAt: new Date(), updatedAt: new Date()
      }

    ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
