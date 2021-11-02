const db = require("../../db/models");
const config = require("../config/auth.config");
const Application = db.application;
const Op = db.Sequelize.Op;

//Create a new company
exports.create = (req, res) => {
    // Validate request
    if (!req.body.firstName) {
        res.status(400).send({
            message: "firstName can not be empty!"
        });
        return;
    }
    // Create a company
    const application = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
        appPeopleId: req.body.appPeopleId,
        adID:req.body.adID,
    };

    // Save Company in the database
    Application.create(application)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Application."
            });
        });
};


// Retrieve all companies from the database.
exports.findAll = (req, res) => {
    const firstName = req.query.firstName;
    var condition = firstName ? {
        firstName: {
            [Op.like]: `%${firstName}%`
        }
    } : null;

    Application.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the application."
            });
        });
};

// Find a single company with  id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Application.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the application with id=" + id
            });
        });
};

//Update a specific  application with id
exports.update = (req, res) => {
    const id = req.params.id;
    const applicationDetails = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description,
    }
    Application.update(req.body, {
            applicationDetails,
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    postMessage: "This application's informations were updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update this application with id=${id} 's informations. Maybe they were not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating this application  with id=" + id
            });
        });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Application.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "This application  was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete this application  with id=${id}. Maybe this person  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete this application  with id=" + id
            });
        });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
    Application.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} all applications were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.company || "Some error occurred while removing all applications."
            });
        });
};