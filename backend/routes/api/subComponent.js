const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const subComponentController = require('../../controllers/subComponent');

router.get('/getsubcomponents', isAuth, subComponentController.getAllSubComponents);

router.get('/getsubcomponents/:engineID/:category', isAuth, subComponentController.getSubComponents);

router.get('/getsubcomponent/:componentID', isAuth, subComponentController.getSubComponentByID);

router.post('/addsubcomponent', isAuth, isAdmin, subComponentController.addSubComponent);

router.put('/updatesubcomponent', isAuth, isAdmin, subComponentController.updateSubComponent);

router.delete('/deletesubcomponent', isAuth, isAdmin, subComponentController.deleteSubComponent);

module.exports = router;