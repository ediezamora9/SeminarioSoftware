const express = require('express');
const router = express.Router();

const isAuth = require('../../middleware/is-auth');
const isAdmin = require('../../middleware/is-admin');
const userController = require('../../controllers/user');

router.get('/getallusers', isAuth, isAdmin, userController.getAllUsers);

router.delete('/deleteuser', isAuth, isAdmin, userController.deleteUser);

module.exports = router;