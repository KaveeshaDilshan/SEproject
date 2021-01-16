const express = require('express');
const QSController = require('../controllers/qsController');
const router = express.Router();
const auth = require('../config/auth');


router.get('/estimation',auth.checkNotAuthenticated, QSController.viewEstimation);
router.get('/estimationView',auth.checkNotAuthenticated, QSController.viewEstimationView);
// router.post('/register', UserController.register);


module.exports = router;