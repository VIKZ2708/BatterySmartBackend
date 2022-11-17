const userController = require("./userController");
const entryController = require("./entryController");
var controllers = {};
controllers.user = userController;
controllers.entry = entryController;

module.exports = controllers;