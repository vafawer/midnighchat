const controller = require("../controllers/messages.controller");
const express = require('express');
const app = express();
app.use(express.json());
const router = express.Router();

// get all ppl
router.get("/all", controller.findAll);

// Retrieve a single Tutorial with id
router.get("/:id", controller.findOne);

// Update a Tutorial with id
router.put("/:id", controller.update);

// Delete a Tutorial with id
router.delete("/:id", controller.delete);

module.exports = router