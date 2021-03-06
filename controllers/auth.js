//package imports
const bcryct = require("bcryptjs");
const otpGenerator = require("otp-generator");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

//custom imports
const Otp = require("../models/otp");
const College = require("../models/college");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const tokenGenerator = require("../utils/token-generator");
const castUser = require("../utils/castUser");
const saveAndSendOtp = require("../utils/sendOtp");
const collegeList = require("../utils/college-list");

// signup / registering user
exports.signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  // extracting data from request body
  const { name, email, password, userType } = req.body;

  const UserType = castUser(userType);

  bcryct
    .hash(password, 12)
    .then((hashedPassword) => {
      const userKey = otpGenerator.generate(10, { specialChars: false });
      const user = new UserType({
        name: name,
        email: email,
        password: hashedPassword,
        isVerified: "false",
        isProfileComplete: "false",
        userKey: userKey,
      });
      user.save();
    })
    .then((user) => {
      const otp = saveAndSendOtp(email, userType);
      res.status(200).json({
        message: "otp sent",
        email: email,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.verifyOtp = (req, res, next) => {
  const { email, otp } = req.body;

  Otp.find({ email: email })
    .then((data) => {
      if (data.length == 0) {
        const error = new Error("Validation failed");
        error.statusCode = 422;
        error.data = {
          value: email,
          msg: "invalid email",
          param: "email",
          location: "otp",
        };
        throw error;
      }

      const savedOtp = data[data.length - 1];
      const { userType } = savedOtp;
      const UserType = castUser(userType);

      // check if entered otp is valid
      if (savedOtp.otp == otp) {
        //verify the user
        UserType.findOne({ email: email }).then((user) => {
          user.isVerified = "true";
          user.save();

          //removing otp from database
          savedOtp.remove();

          //generating tokens
          const refreshToken = tokenGenerator.generateRefreshToken(
            user.email,
            user._id,
            userType,
            user.userKey
          );
          const accessToken = tokenGenerator.generateAccessToken(
            user.email,
            userType,
            user._id
          );

          return res.status(200).json({
            message: "password correct, user added",
            refreshToken,
            accessToken,
            name: user.name,
            email: user.email,
            userId: user._id,
          });
        });
      } else {
        const error = new Error("Validation Failed");
        error.statusCode = 401;
        error.data = {
          value: otp,
          msg: "Otp incorrect",
          param: "otp",
          location: "otp",
        };
        throw error;
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.login = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("Validation Failed ");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const { email, password } = req.body;
  let savedUser;
  let userType = "teacher";

  Student.findOne({ email: email })
    .then((user) => {
      //if user does not exist
      if (!user) {
        return Teacher.findOne({ email: email });
      } else {
        userType = "student";
        return user;
      }
    })
    .then((user) => {
      savedUser = user;;
      if (!user) {
        const error = new Error("Login Failed");
        error.statusCode = 422;
        error.data = {
          value: email,
          msg: "User not found ",
          param: "email",
          location: "login",
        };
        throw error;
      }

      //if user is not verfied
      if (user.isVerified == "false") {
        const otp = saveAndSendOtp(email, userType);
        const error = new Error("Login failed, user not verified");
        error.statusCode = 403;
        error.data = {
          msg: "otp sent please verify yourself",
          location: "login",
        };
        throw error;
      }

      return bcryct.compare(password, user.password);
    })
    .then((match) => {
      // if passwords do not match
      if (!match) {
        const error = new Error("Login Failed");
        error.data = {
          msg: "Password Incorrect ",
          param: "password",
          location: "login",
        };
        error.statusCode = 401;
        throw error;
      } else {
        //if passwords match sending tokens
        //generating tokens
        const refreshToken = tokenGenerator.generateRefreshToken(
          savedUser.email,
          savedUser._id,
          userType,
          savedUser.userKey
        );
        const accessToken = tokenGenerator.generateAccessToken(
          savedUser.email,
          userType,
          savedUser._id
        );
        return res.status(200).json({
          message: "password correct",
          refreshToken,
          accessToken,
          email,
          name: savedUser.name,
          email: savedUser.email,
          type: userType,
          isProfileComplete: savedUser.isProfileComplete,
          userId: savedUser._id,
        });
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getAccesstoken = (req, res, next) => {
  const { email, userType, userId } = req;
  const accessToken = tokenGenerator.generateAccessToken(
    email,
    userType,
    userId
  );

  res.status(200).json({
    accessToken,
  });
};
