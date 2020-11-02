//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const isAuth = require("../middleware/isAuth");
const feedController = require("../controllers/feed");

// POST => /feed/ask
router.post("/ask", isAuth, feedController.ask);

// POST => /feed/view
router.get("/view", isAuth, feedController.view);

module.exports = router;
