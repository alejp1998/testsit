// Definition of the Subject model:
module.exports = function (sequelize, DataTypes) {
    return sequelize.define('Subject',
        {
            degree: {
                type: DataTypes.STRING,
                validate: {notEmpty: {msg: "Degree must not be empty"}}
            },
            itinerary: {
                type: DataTypes.STRING
            },
            subject: {
                type: DataTypes.STRING,
                primaryKey: true,
                unique: true,
                validate: {notEmpty: {msg: "Subject must not be empty"}}
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
                validate: {notEmpty: {msg: "Name must not be empty"}}
            },
            course: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Course must not be empty"}}
            },
            semester: {
                type: DataTypes.INTEGER,
                validate: {notEmpty: {msg: "Semester must not be empty"}}
            }
        });
};

