const castUser = require("../utils/castUser");

exports.updateProfile = (req, res, next) => {
  const { college, branch, year } = req.body;
  const UserType = castUser(req.userType);

  UserType.findOne({ email: req.email })
    .then((user) => {
      user.college = college;
      user.branch = branch;
      user.year = year;

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
