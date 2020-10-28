//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const adminController = require("../controllers/admin");

// GET => /admin/listcolleges
router.get("/listcolleges", adminController.listColleges);

// GET => /admin/updatecolleges
router.get("/updatecolleges", adminController.updateColleges);

module.exports = router;
