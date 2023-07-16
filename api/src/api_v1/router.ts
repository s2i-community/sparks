const express = require("express");
const router = express.Router();
const userController = require("./controllers/userController");

// test
router.get("/user/test", userController.test);

module.exports = router;
