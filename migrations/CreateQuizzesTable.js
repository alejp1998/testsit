'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Quizzes',
        {
          id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
          },
          testid: {
              type: Sequelize.STRING,
              validate: {notEmpty: {msg: "Subject must not be empty"}}
          },
          subject: {
              type: Sequelize.STRING,
              validate: {notEmpty: {msg: "Subject must not be empty"}}
          },
          question: {
            type: Sequelize.TEXT,
            validate: {notEmpty: {msg: "Question must not be empty."}}
          },
          image: Sequelize.STRING,
          answer: {
            type: Sequelize.INTEGER,
            validate: {notEmpty: {msg: "Answer must not be empty."}}
          },
          answer1: Sequelize.STRING,
          answer2: Sequelize.STRING,
          answer3: Sequelize.STRING,
          answer4: Sequelize.STRING,
          answer5: Sequelize.STRING,
          answer6: Sequelize.STRING,
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
    return queryInterface.dropTable('Quizzes');
  }
};