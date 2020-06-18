const path = require('path');
const Sequelize = require('sequelize');

//Heroku Postgres DB or SQLite DB
const url = process.env.DATABASE_URL || "sqlite:quiz.sqlite";
const options = {logging: false};
const sequelize = new Sequelize(url, options);

// Import the definition of the Quiz Table from quiz.js
sequelize.import(path.join(__dirname, 'quiz'));

// Import the definition of the Users Table from user.js
sequelize.import(path.join(__dirname,'user'));

// Emails
sequelize.import(path.join(__dirname,'email'));

// Session
sequelize.import(path.join(__dirname,'session'));

//Charge models
const {quiz,email,User} = sequelize.models;

// Relation 1-to-N between User and Quiz:
User.hasMany(quiz, {foreignKey: 'authorId'});
quiz.belongsTo(User, {as: 'author', foreignKey: 'authorId'});

module.exports = sequelize;
