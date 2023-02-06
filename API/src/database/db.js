const { Sequelize } = require('sequelize');

const {
    MYSQL_URL
  } = process.env;

const sequelize = new Sequelize(
   MYSQL_URL
,
   {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
   
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    },
  
  }
   
);

module.exports = sequelize;
