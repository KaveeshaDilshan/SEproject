const userValidator = require('./validators/userValidator');
const qsService = require('../services/qsServices');


const viewEstimation = async (req, res) => {
    const materials = await qsService.showMaterials();
    res.render('estimation', {name: req.user.name, materials, ANMError: req.query.ANMError});
}

const viewEstimationView = async (req, res) => {
    res.render('estimationView', {name: req.user.name});
}

const addNewMaterial = async (req, res) => {
    try{
    await qsService.addNewMaterial(req.body);
    return res.redirect('../estimation');
    }
    catch(err){
        return res.redirect(`../estimation/?ANMError=${err}`);
  
    }
    
}


module.exports = {
    viewEstimation,
    viewEstimationView,
    addNewMaterial
}
