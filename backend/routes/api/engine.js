const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const engineController = require('../../controllers/engine');

router.get('/getengines', isAuth, engineController.getAllEngines);

router.get('/getengines/:modelID', isAuth, engineController.getEngines);

router.get('/getengine/:engineID', isAuth, engineController.getEngineByID);

router.post('/addengine', isAuth, isAdmin, engineController.addEngine);

router.put('/updateengine', isAuth, isAdmin, engineController.updateEngine);

router.put('/addcomponents', isAuth, isAdmin, engineController.addComponent);

router.delete('/deleteengine', isAuth, isAdmin, engineController.deleteEngine);

router.put('/deletecomponent', isAuth, isAdmin, engineController.deleteComponent);

router.put('/updatecomponent', isAuth, isAdmin, engineController.updateComponent);

module.exports = router;