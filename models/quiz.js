// Definition of the Quiz model:
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Quiz',
        {
            testid: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Testid must not be empty"}}
            },
            subject: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
            },
            question: {
                type: DataTypes.TEXT,
                validate: {notEmpty: {msg: "Question must not be empty"}}
            },
            image: DataTypes.STRING,
            answer: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Answer must not be empty"}}
            },
            answer1: DataTypes.STRING,
            answer2: DataTypes.STRING,
            answer3: DataTypes.STRING,
            answer4: DataTypes.STRING,
            answer5: DataTypes.STRING,
            answer6: DataTypes.STRING
        });
};
