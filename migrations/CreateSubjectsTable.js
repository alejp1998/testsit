'use strict';

module.exports = {
  up(queryInterface, Sequelize) {
    return queryInterface.createTable(
        'Subjects',
        {
            degree: {
              type: Sequelize.STRING,
              validate: {notEmpty: {msg: "Degree must not be empty"}}
            },
            itinerary: {
                type: Sequelize.STRING
            },
            subject: {
                type: Sequelize.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
            },
            name: {
                type: Sequelize.STRING,
                unique: true,
                validate: {notEmpty: {msg: "Name must not be empty"}}
            },
            course: {
                type: Sequelize.INTEGER,
                validate: {notEmpty: {msg: "Course must not be empty"}}
            },
            semester: {
                type: Sequelize.INTEGER,
                validate: {notEmpty: {msg: "Semester must not be empty"}}
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
    return queryInterface.dropTable('Subjects');
  }
};
