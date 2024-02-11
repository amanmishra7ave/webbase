const { planets }=require('../../models/planets.model')


console.log('working ')

function getAllPlanets(req,res) {
    console.log('working ')
    return res.status(200).json(planets);
}

module.exports={
    getAllPlanets,
};