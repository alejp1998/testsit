"use strict";

const {Model} = require('sequelize');
const crypt = require('../helpers/crypt');

// Definition of the User model:
module.exports = function (sequelize, DataTypes) {
    class User extends Model {
        verifyPassword(password) {
            return crypt.encryptPassword(password, this.salt) === this.password;
        }

        get displayName() {
            return this.username || "Unknown";
        }

        get displayNameAuth() {
            return this.username && this.username+"(local)" || "Unknown";
        }
    }

    User.init({
        username: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty: {msg: "Username must not be empty."}}
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            validate: {notEmpty: {msg: "Email must not be empty."}}
        },
        password: {
            type: DataTypes.STRING,
            validate: {notEmpty: {msg: "Password must not be empty."}},
            set(password) {
                // Random String used as salt.
                this.salt = Math.round((new Date().valueOf() * Math.random())) + '';
                this.setDataValue('password', crypt.encryptPassword(password, this.salt));
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isEditor: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        testsTried: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: '0'
        },
        quizzesTried: {
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
        }, {
            sequelize
        }
    );

    return User;
};