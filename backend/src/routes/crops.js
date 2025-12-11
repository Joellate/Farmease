const express = require('express');
const router = express.Router();
const cropController = require('../controllers/cropController');
const auth = require('../middleware/auth');

router.get('/', cropController.getAllCrops);

router.get('/mine', auth, cropController.getMyCrops);

router.post('/', auth, cropController.createCrop);

module.exports = router;
