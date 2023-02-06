const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { signup, login, getAllUsers } = userController ;
const userAuth = require('../middlewares/userAuth')

router.post('/signup',userAuth,signup);

router.post('/login', login);

router.get('/getusers/:team?', getAllUsers)


module.exports = router;

