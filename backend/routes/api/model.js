const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const modelController = require('../../controllers/model');

router.get('/getmodels', isAuth, modelController.getAllModels);

router.get('/getmodels/:brandID/:year', isAuth, modelController.getModels);

router.put('/updatemodel', isAuth, isAdmin, modelController.updateModel);

router.post('/addmodel', isAuth, isAdmin, modelController.addModel);

router.delete('/deletemodel', isAuth, isAdmin, modelController.deleteModel)


module.exports = router;