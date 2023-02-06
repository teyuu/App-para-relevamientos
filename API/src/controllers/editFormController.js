const Result = require('../database/models/Result')
const editresult =  (req, res) => {

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

}

module.exports = {editresult}