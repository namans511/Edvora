//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const libraryController = require("../controllers/library");
const isAuth = require("../middleware/isAuth");

// POST => /library/add
router.post("/add", isAuth, libraryController.add);

// GET => /library/viewall
router.get("/viewall", libraryController.viewall);

// POST => /library/search
router.post("/search", libraryController.search);

module.exports = router;
