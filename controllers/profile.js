const castUser = require("../utils/castUser");

const redis = require("../utils/redis");

exports.viewProfile = (req, res, next) => {
  const UserType = castUser(req.userType);
  redis.set("foo", "bar");
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
  const { college, branch, year } = req.body;
  const UserType = castUser(req.userType);

  UserType.findOne({ email: req.email })
    .then((user) => {
      user.college = college;
      user.branch = branch;
      user.year = year;
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
