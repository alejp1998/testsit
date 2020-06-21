// Definition of the Test model:
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Test',
        {
            testid: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Testid must not be empty"}}
            },
            subject: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
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
            nTries: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: '0'
            },
            hits: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: '0'
            },
            fails: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: '0'
            },
            omissions: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: '0'
            }
        });
};
