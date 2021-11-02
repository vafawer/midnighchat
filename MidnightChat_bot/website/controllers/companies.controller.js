const db = require("../../db/models");
const config = require("../config/auth.config");
const Company = db.company;
const Op = db.Sequelize.Op;

//Create a new company
exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
        res.status(400).send({
            message: "name can not be empty!"
        });
        return;
    }

    // Create a company
    const company = {
        name: req.body.title,
        description: req.body.description,
        companyPeopleId: req.body.companyPeopleId,
    };

    // Save Company in the database
    Company.create(company)
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
    const name = req.query.name;
    var condition = name ? {
        name: {
            [Op.like]: `%${name}%`
        }
    } : null;

    Company.findAll({ where: condition })
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

    Company.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the company with id=" + id
            });
        });
};

//Update a specific  company with id
exports.update = (req, res) => {
    const id = req.params.id;
    const companyDetails = {
        name: req.body.title,
        description: req.body.description,
        companyPeopleId: req.body.companyPeopleId,
    }
    Company.update(req.body, {
            companyDetails,
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    postMessage: "This company's informations were updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update this company with id=${id} 's informations. Maybe they were not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating this company  with id=" + id
            });
        });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Company.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "This company  was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete this company  with id=${id}. Maybe this person  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete this company  with id=" + id
            });
        });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
    Company.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} all companys were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.company || "Some error occurred while removing all companys."
            });
        });
};