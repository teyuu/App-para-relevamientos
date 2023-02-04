const express = require('express');
const router = express.Router();
const Place = require('../database/models/Place');
const User = require('../database/models/User');
const Result = require('../database/models/Result');
const { cloudinary } = require('../utils/cloudinary')

router.post('/uploadimg', async (req,res)=>{
    try{
        const imgSrc = req.body.data
        const uploadResponse = await cloudinary.uploader.upload(imgSrc,{
            upload_preset: 'dev_setups'
        })
        res.status(200).json({msg:'Un exito lo de la foto'})
    }catch(err){
        res.status(500).json(err)
    }
})

router.get('/users', (req, res) => {
    User.findAll({
        include: [{
            model: Place,
            attributes: ["name"]
        },
        {
            model: Result,
            attributes: ['item_relevar', 'decision', 'observaciones', 'placeId']
        }],
        attributes: ["name"]
    }).then(users => {
        res.json(users)
    }).catch(err => {
        res.json(err)
    })
})

router.get('/results', (req, res) => {
    Result.findAll({
        include: {
            model: Place,
            attributes: ['name']
        },
        attributes: ['item_relevar', 'decision', 'observaciones', 'userId']
    }).then(results => {
        res.json(results)
    })
})

router.post('/place', async (req, res) => {

    const { name, userId } = req.body

    try {

        const place = await Place.findOrCreate({
            where: {
                name, userId
            }
        })
        res.json(place)
    } catch (err) {
        console.log(err)
    }
})

router.get('/getplaces', async (req, res) => {
    const places = await Place.findAll()
    res.json(places)
})

router.post('/result', async (req, res) => {

    const { item_relevar, decision, observaciones, placeId, userId } = req.body


    try {
        const result = await Result.findOne({
            where: { item_relevar, userId, placeId }
        })
        if(!result){
            const crear = await Result.create({
            item_relevar,
            decision,
            observaciones,
            placeId,
            userId
            })
            res.status(200).json(crear)
        }else{
            res.status(409).json('Already exist')
        }

    } catch (err) {
        console.log(err)
    }

})

router.patch('/editresult', (req, res) => {

    const { decision, observaciones, item_relevar, userId, placeId } = req.body

    Result.update({
        decision,
        observaciones
    },
        {
            where: { item_relevar, userId, placeId }
        }).then(result => {
            res.json(result)
        }).catch(err => {
            res.status(404).json(err)
        })

});

module.exports = router;