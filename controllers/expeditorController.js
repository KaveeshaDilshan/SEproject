const userValidator = require('./validators/userValidator');
const expeditorServices = require('../services/expeditorServices');
const bcrypt = require('bcrypt');


const viewSendRequest = async (req, res) => {
    res.render('sendRequest', {name: req.user.name});
}
const viewOrder = async (req, res) => {
    const projects = await expeditorServices.getProjects();
    const materials = await expeditorServices.showMaterials();
    res.render('order', {name: req.user.name, projects, materials});
}
const viewUsedMaterial = async (req, res) => {
    res.render('usedMaterial', {name: req.user.name});
}

const addNewOrder = async (req, res) => {
    try{
    await expeditorServices.addNewOrder(req.body);
// console.log(req.body);
    // return res.status(200).send({result: 'redirect', url: 'order', err: ''});
    }
    catch(err){
        // return res.status(200).send({err: `${err}`});
    }
    
}


module.exports = {
    viewSendRequest,
    viewOrder,
    viewUsedMaterial,
    addNewOrder
   
}
