const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController')
const { signup, login } = userController ;
const userAuth = require('../middlewares/userAuth')

router.post('/signup',userAuth,signup);

router.post('/login', login);




module.exports = router;

