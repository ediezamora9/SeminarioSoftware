const express = require('express');
const router = express.Router();

const upload =  require('../../utils/storage');
const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const partController = require('../../controllers/part');

router.get('/getparts', isAuth, partController.getAllParts);

router.get('/getparts/:subComponentID', isAuth, partController.getParts);

router.get('/getpart/:partID', isAuth, partController.getPartByID);

router.post('/addpart', isAuth, isAdmin, upload.single('photo'), partController.addPart);

router.put('/addDetails', isAuth, isAdmin, partController.addDetails);

router.get('/searchparts', isAuth, partController.searchPart);

router.delete('/deletepart', isAuth, isAdmin, partController.deletePart);

router.put('/updatepart', isAuth, isAdmin, upload.single('photo'), partController.updatePart);

module.exports = router;