// Definition of the Quiz model:
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('quiz',
        {
            testid: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Testid must not be empty"}}
            },
            subject: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
            },
            course: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Course must not be empty"}}
            },
            semester: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Semester must not be empty"}}
            },
            year: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Year must not be empty"}}
            },
            month: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Month must not be empty"}}
            },
            desc: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Description must not be empty"}}
            },
            question: {
                type: DataTypes.TEXT,
                validate: {notEmpty: {msg: "Question must not be empty"}}
            },
            answer: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Answer must not be empty"}}
            },
            answer1: DataTypes.STRING,
            answer2: DataTypes.STRING,
            answer3: DataTypes.STRING,
            answer4: DataTypes.STRING
        });
};
