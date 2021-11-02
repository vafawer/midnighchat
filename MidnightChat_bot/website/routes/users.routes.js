const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')
const models = require('../../db/models');


// Retrieve all ads
router.get('/all', usersController.findAll);

// Create a new ad
router.route('/new').post(usersController.create);

// Retrieve a single ad with id
router.get('/:id', usersController.findOne);

// Update an ad with id
router.put('/:id', usersController.update);

// Delete an ad with id
router.delete('/:id', usersController.delete);

module.exports = router