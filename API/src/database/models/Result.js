const { Model, DataTypes } = require('sequelize');
const db = require('../db');

class Result extends Model {};

Result.init({

    item_relevar: DataTypes.STRING,
    decision: DataTypes.STRING,
    observaciones: DataTypes.TEXT
},{
    sequelize: db,
    modelName:"result",
    timestamps:false,
});

module.exports = Result;