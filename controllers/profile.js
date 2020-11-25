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
  const UserType = castUser(req.userType);

  UserType.findById(req.userId)
    .then((user) => {
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          const element = req.body[key];
          user.set(key, element);
        }
      }
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

exports.getBookmark = (req, res, next) => {
  const { type } = req.params;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .populate()
    .then((user) => {
      if (type == "subjects") return user;
      else return user.execPopulate(type);
    })
    .then((data) => {
      console.log(data[type]);
      res.json(data[type]);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
