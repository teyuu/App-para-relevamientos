const User = require('../database/models/User');
const Place = require('../database/models/Place');
const Result = require('../database/models/Result');

const getUserData = (req, res) => {
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
}

const getAllResults = (req, res) => {

	const { id } = req.params;

	try {
		
		if(!id){
			Result.findAll({
				include: {
					model: Place,
					attributes: ['name']
				},
				attributes: ['item_relevar', 'decision', 'observaciones', 'userId', 'imagen']
			}).then(results => {
				res.json(results)
			});
		}else{
			Result.findAll({
				where: { userId: id},
				include: {
					model: Place,
					attributes: ['id','name']
				},
				attributes: ['id','item_relevar', 'decision', 'observaciones', 'userId', 'imagen']
			}).then(results=>{
				res.json(results)
			})
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: error.message });
	}
};

module.exports = { getUserData, getAllResults }