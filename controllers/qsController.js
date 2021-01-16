const userValidator = require('./validators/userValidator');
const userService = require('../services/UserServices');
const bcrypt = require('bcrypt');


const viewEstimation = async (req, res) => {
    res.render('estimation', {name: req.user.name});
}

const viewEstimationView = async (req, res) => {
    res.render('estimationView', {name: req.user.name});
}


module.exports = {
    viewEstimation,
    viewEstimationView
   
}
