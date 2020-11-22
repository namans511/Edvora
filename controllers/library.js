const Library = require("../models/library");
const capitalise = require("../helper/capitalise");

exports.add = (req, res, next) => {
  const { title, type, year, subject, url } = req.body;
  const { userId, userType } = req;
  console.log(userId, userType);
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
