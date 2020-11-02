//package imports
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

//custom imports
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const authController = require("../controllers/auth");
const isAuthRefresh = require("../middleware/isAuthRefresh");

// POST => /auth/verifyotp
router.post(
  "/verifyotp",
  [body("email").isEmail().withMessage("Invalid email").normalizeEmail()],
  authController.verifyOtp
);

// POST => /auth/signup
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email")
      .normalizeEmail()
      .custom((value, { req }) => {
        return Student.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("student already exists");
          }
        });
      })
      .custom((value, { req }) => {
        return Teacher.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("teacher already exists");
          }
        });
      }),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().notEmpty(),
  ],
  authController.signup
);

// POST => /auth/login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email").normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
  ],
  authController.login
);

// GET => /auth/getaccesstoken
router.get("/getaccesstoken", isAuthRefresh, authController.getAccesstoken);

module.exports = router;
