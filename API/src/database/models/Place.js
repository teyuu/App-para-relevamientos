const { Model, DataTypes } = require('sequelize');
const db = require('../db');

class Place extends Model {};

Place.init({

    name: DataTypes.STRING

},{
    sequelize: db,
    modelName:"place",
    timestamps:false
});

module.exports = Place;