const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");

router.get("/getAll", controller.entry.getAll);
router.get("/:name", controller.entry.getname);
router.post("/create", controller.entry.createNew);

module.exports = router;