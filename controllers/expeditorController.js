const userValidator = require('./validators/userValidator');
const userService = require('../services/UserServices');
const bcrypt = require('bcrypt');


const viewSendRequest = async (req, res) => {
    res.render('sendRequest', {name: req.user.name});
}
const viewOrder = async (req, res) => {
    res.render('order', {name: req.user.name});
}
const viewUsedMaterial = async (req, res) => {
    res.render('usedMaterial', {name: req.user.name});
}

module.exports = {
    viewSendRequest,
    viewOrder,
    viewUsedMaterial
   
}
