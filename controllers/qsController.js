const qsService = require('../services/qsServices');


const viewEstimation = async (req, res) => {
    const materials = await qsService.showMaterials();
    res.render('estimation', {name: req.user.name, materials});
}

const viewEstimationView = async (req, res) => {
    const estimates = await qsService.showEstimate();
    res.render('estimationView', {name: req.user.name, estimates});
}

const addNewMaterial = async (req, res) => {
    try{
    await qsService.addNewMaterial(req.body);
    return res.status(200).send({result: 'redirect', url: 'estimation', err: ''});
    }
    catch(err){
        return res.status(200).send({err: `${err}`});
        
  
    }
    
}


module.exports = {
    viewEstimation,
    viewEstimationView,
    addNewMaterial
}
