'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('emails',[
        {
          email: 'admin@alumnos.upm.es',
          username: 'admin',
          used: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'ale@alumnos.upm.es',
          username: 'ale',
          used: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'trial@alumnos.upm.es',
          username: '',
          used: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('emails', null, {});
  }
};