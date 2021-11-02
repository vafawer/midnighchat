const db = require("../../db/models");
const User = db.users;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Create a new user
exports.create = (req, res) => {
  // Validate request
/*   if (!req.body.title) {
      res.status(400).send({
          message: "title can not be empty!"
      });
      return;
  } */

  // Create a company
  const user = {
      tg_id: req.body.tg_id,
      tg_userName: req.body.tg_userName,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      verif_code: req.body.verif_code,
      balance: req.body.balance,
  };

  // Save Company in the database
  User.create(user)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while creating the USER."
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

  User.findAll({ where: condition })
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving the company."
          });
      });
};

// Find a single user with  id
exports.findOne = (req, res) => {

  const id = req.params.id;

  User.findByPk(id)
      .then(data => {
          res.send(data);
      })
      .catch(err => {
          res.status(500).send({
              message: "Error retrieving the company with id=" + id
          });
      });
};

//Update a specific  user with id
exports.update = (req, res) => {
  const id = req.params.id;
  const userDetails = {
      tg_id: req.body.tg_id,
      tg_userName: req.body.tg_userName,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      verif_code: req.body.verif_code,
      balance: req.body.balance,
  }
  User.update(req.body, {
          userDetails,
          where: { id: id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  postMessage: "This user's informations were updated successfully."
              });
          } else {
              res.send({
                  message: `Cannot update this user with id=${id} 's informations. Maybe they were not found or req.body is empty!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Error updating this user  with id=" + id
          });
      });
};

// Delete a person with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
          where: { id: id }
      })
      .then(num => {
          if (num == 1) {
              res.send({
                  message: "This user  was deleted successfully!"
              });
          } else {
              res.send({
                  message: `Cannot delete this user  with id=${id}. Maybe this person  was not found!`
              });
          }
      })
      .catch(err => {
          res.status(500).send({
              message: "Could not delete this user with id=" + id
          });
      });
};

// Delete all people  from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
          where: {},
          truncate: false
      })
      .then(nums => {
          res.send({ message: `${nums} all users were deleted successfully!` });
      })
      .catch(err => {
          res.status(500).send({
              message: err.company || "Some error occurred while removing all users."
          });
      });
};