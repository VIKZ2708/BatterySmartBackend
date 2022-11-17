const userModel = require("./userModel");
const entryModel = require("./entryModel");
const model = {};
model.user = userModel;
model.entry = entryModel;
module.exports = model;