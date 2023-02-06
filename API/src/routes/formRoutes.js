const express = require('express');
const router = express.Router();
const { uploadImg, postPlace, postResult } = require('../controllers/formPostController')
const { getUserResults, getAllResults } = require('../controllers/getDataController')
const { editresult } = require('../controllers/editFormController')

//Post routes

router.post('/uploadimg', uploadImg);
router.post('/place', postPlace);
router.post('/result', postResult);

//Get routes
router.get('/users', getUserResults)
router.get('/results', getAllResults)

//Patch routes
router.patch('/editresult', editresult)

module.exports = router;