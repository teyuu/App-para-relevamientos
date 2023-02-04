const { Model, DataTypes } = require('sequelize');
const db = require('../db');

class Visita extends Model {};

Visita.init({

    registered: DataTypes.STRING

},{
    sequelize: db,
    modelName:"visita",
    timestamps:false
});

module.exports = Visita;