//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");

// POST => /auth/update
router.post("/update", isAuth, profileController.updateProfile);

module.exports = router;
