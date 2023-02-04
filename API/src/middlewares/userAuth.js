const User = require('../database/models/User');

const saveUser = async (req, res, next) => {
    //search the database to see if user exist
    try {
      const username = await User.findOne({
        where: {
          userName: req.body.userName,
        },
      });
      //if username exist in the database respond with a status of 409
      if (username) {
        return res.json("username already taken");
      }
   
      //checking if email already exist
      const emailcheck = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
   
      //if email exist in the database respond with a status of 409
      if (emailcheck) {
        return res.json("email already exist");
      }
   
      next();
    } catch (error) {
      console.log(error);
    }
   };

module.exports = saveUser
