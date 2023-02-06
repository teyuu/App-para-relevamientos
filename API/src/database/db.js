const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(
   process.env.MYSQLDATABASE ,
   process.env.MYSQLUSER ,
   process.env.MYSQLPASSWORD,{
        host: process.env.MYSQLHOST,
        dialect: "mysql"
    }
);

module.exports = sequelize;
