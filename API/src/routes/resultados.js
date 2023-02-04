const express = require('express');
const router = express.Router();
const Result = require('../database/models/Result')


router.post('/', async (req, res)=>{

    try{
     const {userId, placeId} = req.body;
    
     const result = await Result.findAll({
        where:{
             placeId, userId
        }
     })
     res.json(result)

    }catch(err){
        res.json(err)
    }

});



module.exports = router;