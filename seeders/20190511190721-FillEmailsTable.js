'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('emails',[
        {
          email: 'admin@alumnos.upm.es',
          used: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'ale@alumnos.upm.es',
          used: true,
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'trial@alumnos.upm.es',
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