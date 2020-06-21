'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Emails',[
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
          email: 'rocio@alumnos.upm.es',
          username: 'rocio',
          used: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'mamado@alumnos.upm.es',
          username: 'mamado',
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
    return queryInterface.bulkDelete('Emails', null, {});
  }
};