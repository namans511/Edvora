//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const isAuth = require("../middleware/isAuth");
const feedController = require("../controllers/feed");

// POST => /feed/ask
router.post("/ask", isAuth, feedController.ask);

// GET => /feed/view/:questionId
router.get("/view/:questionId", isAuth, feedController.viewDetails)

// GET => /feed/view
router.get("/view", isAuth, feedController.view);

// POST => /feed/answer
router.post("/answer", isAuth, feedController.answer);

module.exports = router;
