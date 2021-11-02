const express = require('express')
const router = express.Router()
const adsController = require('../controllers/ads.controller')
const models = require('../../db/models');


// Retrieve all ads
router.get('/all', adsController.findAll);

// Create a new ad
router.route('/new').post(adsController.create);

// Retrieve a single ad with id
router.get('/:id', adsController.findOne);

// Update an ad with id
router.put('/:id', adsController.update);

// Delete an ad with id
router.delete('/:id', adsController.delete);

module.exports = router