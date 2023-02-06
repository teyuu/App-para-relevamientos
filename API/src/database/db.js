const { Sequelize } = require('sequelize');

const dotenv = require('dotenv').config();


require('dotenv').config();

const {
  MYSQLDATABASE, MYSQLHOST, MYSQLPASSWORD, MYSQLPORT, MYSQLUSER
} = process.env;

const sequelize = new Sequelize(
  {
    username:MYSQLUSER,
    password:MYSQLPASSWORD,
    database:MYSQLDATABASE,
    dialect:'mysql',
    port:MYSQLPORT,
    host:MYSQLHOST
  }

);

module.exports = sequelize;
