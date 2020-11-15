const castUser = require("../utils/castUser");
const Student = require("../models/student");
const Teacher = require("../models/teacher");

exports.viewProfile = (req, res, next) => {
  const userId = req.params.userId;
  let userType = "teacher";
  Student.findById(userId)
    .select("-password -userKey -isVerified -isProfileComplete")
    .then((user) => {
      //if user does not exist
      if (!user) {
        return Teacher.findById(userId).select(
          "-password -userKey -isVerified -isProfileComplete"
        );
      } else {
        userType = "student";
        return user;
      }
    })
    .then((user) => {
      if (!user) {
        const error = new Error("User Not Found");
        error.statusCode = 422;
        error.data = {
          value: userId,
          msg: "No such user exists",
          param: "userId",
          location: "view profile",
        };
        throw error;
      }
      res.status(200).json({ user, userType });
    });
};

exports.viewOwnProfile = (req, res, next) => {
  const UserType = castUser(req.userType);

  UserType.findOne({ email: req.email })
    .then((user) => {
      res.status(200).json({
        user,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.updateProfile = (req, res, next) => {
  const { college, branch, year, imageUrl } = req.body;
  const UserType = castUser(req.userType);

  UserType.findOne({ email: req.email })
    .then((user) => {
      user.college = college;
      user.branch = branch;
      user.year = year;
      user.imageUrl = imageUrl;
      user.isProfileComplete = "true";

      return user.save();
    })
    .then((user) => {
      res.status(200).json({
        message: "Profile updated successfully",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
