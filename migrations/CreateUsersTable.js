'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('Users',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
          },
          username: {
            type: Sequelize.STRING,
            unique: true,
            validate: {notEmpty: {msg: "Username must not be empty."}}
          },
          email: {
            type: Sequelize.STRING,
            unique: true,
            validate: {notEmpty: {msg: "Email must not be empty."}}
          },
          password: {
            type: Sequelize.STRING,
            validate: {notEmpty: {msg: "Password must not be empty."}}
          },
          salt: {
            type: Sequelize.STRING
          },
          isAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          isEditor: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          },
          testsTried: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
          },
          quizzesTried: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
          },
          hits: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
          },
          fails: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
          },
          omissions: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: '0'
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

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('Users');
  }
};
