const express = require('express')
const router = express.Router()
const applicationController = require('../controllers/applications.controller');

// Retrieve all people
router.get('/all', applicationController.findAll);

// Create a new people
router.route('/new').post(applicationController.create);

// Retrieve a single person with id
router.get('/:id', applicationController.findOne);

// Update a person with id
router.put('/:id', applicationController.update);

// Delete a person with id
router.delete('/:id', applicationController.delete);

module.exports = router