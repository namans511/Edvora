const Library = require("../models/library");

exports.add = (req, res, next) => {
  const { title, type, year, subject, url } = req.body;
  Library.create({
    title,
    type,
    year,
    subject,
    url,
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
