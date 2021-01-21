const qsService = require('../services/qsServices');


const viewEstimation = async (req, res) => {
    const materials = await qsService.showMaterials();
    const allprojects = await qsService.showAllProjects();
    res.render('estimation', {name: req.user.name, allprojects,materials});
}

const viewEstimationView = async (req, res) => {
    const estimates = await qsService.showEstimate(req.body);
    const est_project = await qsService.showEst_Project(req.body);
    const allprojects = await qsService.showAllProjects();
    res.render('estimationView', {name: req.user.name,estimates,est_project,allprojects});
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
