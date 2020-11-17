//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

const adminController = require("../controllers/admin");

// GET => /admin/listcolleges
router.get("/listcolleges", adminController.listColleges);

// GET => /admin/updatecolleges
router.get("/updatecolleges", adminController.updateColleges);

// GET => /admin/listbranches
router.get("/listbranches", adminController.listBranches);

// GET => /admin/updatebranches
router.get("/updatebranches", adminController.updateBranch);

// GET => /admin/listdepartments
router.get("/listdepartments", adminController.listDepartments);

// GET => /admin/updatedepartment
router.get("/updatedepartment", adminController.updateDepartment);

// GET => /admin/listsubjects
router.get("/listsubjects", adminController.listSubjects);

// GET => /admin/updatesubjects
router.get("/updatesubjects", adminController.updateSubjects);

module.exports = router;
