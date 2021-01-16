const express = require('express');
const ExpeditorController = require('../controllers/expeditorController');
const router = express.Router();
const auth = require('../config/auth');


router.get('/sendRequest',auth.checkNotAuthenticated, ExpeditorController.viewSendRequest);
router.get('/order',auth.checkNotAuthenticated, ExpeditorController.viewOrder);
router.get('/usedMaterial',auth.checkNotAuthenticated, ExpeditorController.viewUsedMaterial);
// router.post('/register', UserController.register);


module.exports = router;