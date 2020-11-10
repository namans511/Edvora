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

// PATCH => /feed/editquestion
router.patch("/editquestion", isAuth, feedController.editQuestion);

// DELETE => /feed/deletequestion
router.delete("/deletequestion", isAuth, feedController.deleteQuestion)

router.delete("/deleteanswer", isAuth, feedController.deleteAnswer);

router.patch("/editanswer", isAuth, feedController.editAnswer);

module.exports = router;
