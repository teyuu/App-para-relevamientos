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

const deleteResult = (req, res) =>{
    const {id} = req.body;

    try{
        Result.destroy({
            where:{id : id}
        }).then(response=>{
            res.json(response)
        }).catch(e=>{
            res.json(e)
        }).catch(err=>{
            res.json({mgs:'error'},err)
        })

    }catch(error){
        console.log(error)
    }
}


module.exports = {editresult,deleteResult}