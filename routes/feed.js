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

// DELETE => /feed/deleteanswer
router.delete("/deleteanswer", isAuth, feedController.deleteAnswer);

// PATCH => /feed/editanswer
router.patch("/editanswer", isAuth, feedController.editAnswer);

// POST => /feed/savepost
router.post("/savepost",isAuth, feedController.savePost);

module.exports = router;
