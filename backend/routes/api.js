const express = require('express');
const router = express.Router();

const authRoutes = require('./api/auth');
const userRoutes = require('./api/user');
const brandsRoutes = require('./api/brands');
const modelRoutes = require('./api/model');
const engineRoutes = require('./api/engine');
const subComponentRoutes = require('./api/subComponent');
const partRoutes = require('./api/part');

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/brands', brandsRoutes);
router.use('/models', modelRoutes);
router.use('/engines', engineRoutes);
router.use('/subcomponents', subComponentRoutes);
router.use('/parts', partRoutes);

module.exports = router;