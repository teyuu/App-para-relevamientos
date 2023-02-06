const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();
const {
    MYSQLUSER, MYSQLPASSWORD, MYSQLHOST, MYSQLPORT, MYSQLDATABASE
  } = process.env;

const sequelize = new Sequelize(
   `mysql://${{ MYSQLUSER }}:${{ MYSQLPASSWORD }}@${{ MYSQLHOST }}:${{ MYSQLPORT }}/${{ MYSQLDATABASE }}`
);

module.exports = sequelize;
