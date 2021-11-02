const express = require('express')
const router = express.Router()
const companiesController = require('../controllers/companies.controller');

// Retrieve all companies
router.get('/all', companiesController.findAll);

// Create a new company
router.route('/new').post(companiesController.create);

// Retrieve a single company with id
router.get('/:id', companiesController.findOne);

// Update a company with id
router.put('/:id', companiesController.update);

// Delete a company with id
router.delete('/:id', companiesController.delete);

module.exports = router