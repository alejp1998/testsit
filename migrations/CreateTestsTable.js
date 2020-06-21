'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Tests',
        {
            testid: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Testid must not be empty"}}
            },
            subject: {
                type: Sequelize.STRING,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
            },
            year: {
                type: Sequelize.INTEGER,
                validate: {notEmpty: {msg: "Year must not be empty"}}
            },
            month: {
                type: Sequelize.INTEGER,
                validate: {notEmpty: {msg: "Month must not be empty"}}
            },
            desc: {
                type: Sequelize.STRING,
                validate: {notEmpty: {msg: "Description must not be empty"}}
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
    return queryInterface.dropTable('Tests');
  }
};
