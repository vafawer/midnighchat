const db = require("../../db/models");
const config = require("../config/auth.config");
const Ad = db.ad;
const Op = db.Sequelize.Op;

//Create a new company
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "title can not be empty!"
        });
        return;
    }

    // Create a company
    const ad = {
        companyName: req.body.companyName,
        title: req.body.title,
        description: req.body.description,
        wage: req.body.wage,
        workingTime: req.body.workingTime,
        location: req.body.location,
    };

    // Save Company in the database
    Ad.create(ad)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Company."
            });
        });
};


// Retrieve all companies from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Ad.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the company."
            });
        });
};

// Find a single company with  id
exports.findOne = (req, res) => {

    const id = req.params.id;

    Ad.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the company with id=" + id
            });
        });
};

//Update a specific  ad with id
exports.update = (req, res) => {
    const id = req.params.id;
    const adDetails = {
        companyName: req.body.companyName,
        title: req.body.title,
        description: req.body.description,
        wage: req.body.wage,
        workingTime: req.body.workingTime,
        location: req.body.location,
    }
    Ad.update(req.body, {
            adDetails,
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    postMessage: "This ad's informations were updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update this ad with id=${id} 's informations. Maybe they were not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating this ad  with id=" + id
            });
        });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Ad.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "This ad  was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete this ad  with id=${id}. Maybe this person  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete this ad  with id=" + id
            });
        });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
    Ad.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} all ads were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.company || "Some error occurred while removing all ads."
            });
        });
};