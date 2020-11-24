const Library = require("../models/library");
const capitalise = require("../helper/capitalise");
const castUser = require("../utils/castUser");

exports.add = (req, res, next) => {
  const { title, type, year, subject, url } = req.body;
  const { userId, userType } = req;
  Library.create({
    title,
    type,
    year,
    subject,
    url,
    userType: capitalise(userType),
    createdBy: userId,
  })
    .then((notes) => {
      res.json({
        message: "hogaya upload bhai",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewall = (req, res, next) => {
  Library.find()
    .populate("createdBy", "name email college")
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.search = (req, res, next) => {
  Library.find(req.body)
    .populate("createdBy", "name email college")
    .then((notes) => {
      res.json(notes);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.bookmark = (req, res, next) => {
  const { name } = req.body;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      const subjects = [...user.subjects, name];
      user.subjects = subjects;
      return user.save();
    })
    .then((data) => {
      res.json({
        message: "bookmark saved",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};