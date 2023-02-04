const { Model, DataTypes } = require('sequelize');
const db = require('../db');

class User extends Model {};

User.init({

    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        isEmail: true, //checks for email format
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    team: {
        type: DataTypes.STRING,
        allowNull: false
    }


},{
    sequelize: db,
    modelName:"user",
    timestamps:false,
});

module.exports = User;