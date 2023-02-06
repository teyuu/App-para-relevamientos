const express = require('express');
const router = express.Router();
const Place = require('../database/models/Place');
const User = require('../database/models/User');
const Result = require('../database/models/Result');
const { cloudinary } = require('../utils/cloudinary')

router.post('/uploadimg', async (req,res)=>{

    if (!req.body.data) {
        return res.status(400).json({ message: 'No se proporcionó una imagen para subir' });
    }

    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        
        res.json(uploadResponse );
    } catch (err) {
        if (err.name === 'CloudinaryError') {
            console.error(err);
            return res.status(500).json({ message: 'Error al subir la imagen a Cloudinary' });
        }
        console.error(err);
        return res.status(500).json({ message: 'Error interno del servidor' });
    }
})

router.get('/users', (req, res) => {
    try {
        User.findAll({
            include: [{
                model: Place,
                attributes: ["name"]
            },
            {
                model: Result,
                attributes: ['item_relevar', 'decision', 'observaciones', 'placeId']
            }],
            attributes: ["userName"]
        })
        .then(users => {
            res.json(users)
        })
        .catch(err => {
            throw new Error(err)
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: error.message })
    }
})

router.get('/results', (req, res) => {
    try {
        Result.findAll({
            include: {
                model: Place,
                attributes: ['name']
            },
            attributes: ['item_relevar', 'decision', 'observaciones', 'userId', 'imagen']
        }).then(results => {
            res.json(results)
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/place', async (req, res) => {
    const { name, userId } = req.body;

    try {
        if (!name || !userId) {
            return res.status(400).json({ error: 'Name y userId son requeridos' });
        }

        const place = await Place.findOrCreate({
            where: { name, userId },
        });

        res.json(place);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Fallo al crear place' });
    }
});


router.get('/getplaces', async (req, res) => {
    const places = await Place.findAll()
    res.json(places)
})

router.post('/result', async (req, res) => {
    try {
        const { item_relevar, decision, observaciones, placeId, userId, picUrl } = req.body

        const existingResult = await Result.findOne({
            where: { item_relevar, userId, placeId }
        });
        if (!existingResult) {
            const newResult = await Result.create({
                item_relevar,
                decision,
                observaciones,
                placeId,
                userId,
                imagen: picUrl
            });
            return res.status(200).json(newResult);
        } else {
            return res.status(409).json({ message: 'Result already exists' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
});

router.patch('/editresult', (req, res) => {

    const { decision, observaciones, item_relevar, userId, placeId, picUrl } = req.body

    Result.update({
        decision,
        observaciones,
        imagen: picUrl
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