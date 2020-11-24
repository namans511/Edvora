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

// POST => /library/addsubject
router.post("/bookmarksubject", isAuth, libraryController.bookmarkSubject);

// DELETE => /library/deletesubject
router.delete(
  "/deletesubject",
  isAuth,
  libraryController.deleteSubject
);

// GET => /library/viewsubjects
router.get("/viewsubjects", isAuth, libraryController.viewSubjects);

// POST => /library/bookmarknotes
router.post("/bookmarknote", isAuth, libraryController.bookmarkNotes);

//GET => /library/viewnotes
router.get("/viewnotes", isAuth, libraryController.viewSavedNotes);

//DELETE => /library/deletenote
router.delete("/deletenote", isAuth, libraryController.deleteNote);

module.exports = router;
