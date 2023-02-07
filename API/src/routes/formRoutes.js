const express = require('express');
const router = express.Router();
const { uploadImg, postPlace, postResult } = require('../controllers/formPostController')
const { getUserData, getAllResults } = require('../controllers/getDataController')
const { editresult, deleteResult } = require('../controllers/editFormController')

//Post routes

router.post('/uploadimg', uploadImg);
router.post('/place', postPlace);
router.post('/result', postResult);

//Get routes
router.get('/users', getUserData);
router.get('/results/:id?', getAllResults);

//Patch routes
router.patch('/editresult', editresult);

//Delete
router.delete('/delete', deleteResult);

module.exports = router;