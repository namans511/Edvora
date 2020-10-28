//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const Student = require("../models/student");
const authController = require("../controllers/auth");

// POST => /auth/verifyotp
router.post("/verifyotp", authController.verifyOtp);

// POST => /auth/signup
router.post("/signup", authController.signup);

// POST => /auth/login
router.post("/login", authController.login);

module.exports = router;
