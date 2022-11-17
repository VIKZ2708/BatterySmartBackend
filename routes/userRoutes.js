const express = require("express");
const router = express.Router();
const controller = require("../controller/indexController");

router.get("/getAll", controller.user.getAll);
router.get("/:name", controller.user.getname);
router.post("/create", controller.user.createNew);
router.put("/", controller.user.editAt);
router.delete("/", controller.user.deleteUser);

module.exports = router;