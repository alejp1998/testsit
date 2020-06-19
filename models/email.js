// Definition of the email model:
module.exports = (sequelize,DataTypes) => {
    return sequelize.define(
        'email',
        {
            email: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Email must not be empty."}}
            },
            username: {
                type: DataTypes.STRING,
                unique: true,
                defaultValue: ''
            },
            used: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        });
};