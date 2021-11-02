const db = require("../../db/models");
const config = require("../config/auth.config");
const Message = db.message;
const Op = db.Sequelize.Op;

//Create a new message
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Title can not be empty!"
        });
        return;
    }

    // Create a message
    const message = {
        title: req.body.title,
        content: req.body.content,
        senderId: req.body.senderId,
        receiverId: req.body.receiverId,
    };

    // Save Message in the database
    Message.create(message)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Message."
            });
        });
};


// Retrieve all messages from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? {
        title: {
            [Op.like]: `%${title}%`
        }
    } : null;

    Message.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving the message."
            });
        });
};

// Find a single message with  id
exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving the message with id=" + id
            });
        });
};

//Update a specific  message with id
exports.update = (req, res) => {
    const id = req.params.id;
    const messageDetails = {
        title: req.body.title,
        content: req.body.content,
    }
    Message.update(req.body, {
            messageDetails,
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "This message's informations were updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update this message with id=${id} 's informations. Maybe they were not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating this message  with id=" + id
            });
        });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Message.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "This message  was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete this message  with id=${id}. Maybe this person  was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete this message  with id=" + id
            });
        });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
    Message.destroy({
            where: {},
            truncate: false
        })
        .then(nums => {
            res.send({ message: `${nums} all messages were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all messages."
            });
        });
};