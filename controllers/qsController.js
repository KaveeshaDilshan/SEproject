const qsService = require('../services/qsServices');

var estimate_materials = []

const viewEstimation = async (req, res) => {
    const materials = await qsService.showMaterials();
    const allprojects = await qsService.showAllProjects();
    res.render('estimation', {name: req.user.name, allprojects,materials,estimate_materials});
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

const addNewestimateMaterial = async (req, res) => {
    try{
        const material_select = req.body.material_select;
        console.log(material_select);
        const material_quantity = req.body.material_quantity;
        let material_name;
        let material_amount;
        [material_name,material_amount] = material_select.split(/\s{9}/);
        const estimateMaterials = await qsService.showMaterialtoEstimate(material_name,material_amount);
        let material_cost = (estimateMaterials[0].m_cost)*material_quantity;
        estimate_materials.push({material_name,material_amount,material_quantity,material_cost});
        return res.status(200).send({result: 'redirect', url: 'estimation', err: ''});
    }
    catch(err){
        return res.status(200).send({err: `${err}`});
    }
}


module.exports = {
    viewEstimation,
    viewEstimationView,
    addNewMaterial,
    addNewestimateMaterial
}
