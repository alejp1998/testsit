'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    
    return queryInterface.bulkInsert('Tests',[
        {
          testid: 'RDPR-11-2018-1',
          subject: 'RDPR',
          year: 2018,
          month: 11,
          desc: '1er Parcial',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ]);
  },

  down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Tests', null, {});
  }
};