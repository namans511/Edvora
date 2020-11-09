//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const profileController = require("../controllers/profile");
const isAuth = require("../middleware/isAuth");

// GET => /profile/view/userId
router.get("/view/:userId", isAuth, profileController.viewProfile);

// GET => /profile/view
router.get("/view", isAuth, profileController.viewOwnProfile);

// POST => /profile/update
router.post("/update", isAuth, profileController.updateProfile);

module.exports = router;
