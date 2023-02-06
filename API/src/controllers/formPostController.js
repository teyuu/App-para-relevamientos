const Place = require('../database/models/Place');
const User = require('../database/models/User');
const Result = require('../database/models/Result');
const { cloudinary } = require('../utils/cloudinary')


const uploadImg = async (req,res)=>{

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
}

const postPlace = async (req, res) => {
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
};

const postResult =  async (req, res) => {
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
};

module.exports={
    uploadImg,postPlace,postResult
}