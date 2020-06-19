'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
        'emails',
        {
            email: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Email must not be empty."}}
            },
            username: {
              type: Sequelize.STRING,
              unique: true
            },
            used: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            createdAt: {
              type: Sequelize.DATE,
              allowNull: false
            },
            updatedAt: {
              type: Sequelize.DATE,
              allowNull: false
            }
        },
        {
          sync: {force: true}
        }
    );
  },
  down(queryInterface, Sequelize) {
    return queryInterface.dropTable('emails');
  }
};