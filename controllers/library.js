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

exports.bookmarkSubject = (req, res, next) => {
  const { subject } = req.body;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      const index = user.subjects.findIndex((sub) => sub == subject);

      if (index != -1) {
        const error = new Error("Subject already bookmarked");
        error.statusCode = 422;
        throw error;
      }

      const subjects = [...user.subjects, subject];
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

exports.deleteSubject = (req, res, next) => {
  const { subject } = req.body;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      const index = user.subjects.findIndex((sub) => sub == subject);

      if (index == -1) {
        const error = new Error("Subject not bookmarked");
        error.statusCode = 422;
        throw error;
      }

      user.subjects.splice(index, 1);
      user.save();
      res.json({
        message: "bookmark removed from subject",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewSubjects = (req, res, next) => {
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      res.json(user.subjects);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.bookmarkNotes = (req, res, next) => {
  const { noteId } = req.body;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      const index = user.notes.findIndex((id) => id == noteId);

      if (index != -1) {
        const error = new Error("Subject already bookmarked");
        error.statusCode = 422;
        throw error;
      }

      user.notes = [...user.notes, noteId];
      user.save();
      res.json({
        message: "hogaya bhai",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewSavedNotes = (req, res, next) => {
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .populate("notes")
    .then((user) => {
      res.json(user.notes);
    });
};

exports.deleteNote = (req, res, next) => {
  const { noteId } = req.body;
  const { userId, userType } = req;
  const UserType = castUser(userType);

  UserType.findById(userId)
    .then((user) => {
      const index = user.notes.findIndex((id) => id == noteId);

      if (index == -1) {
        const error = new Error("Subject not bookmarked");
        error.statusCode = 422;
        throw error;
      }

      user.notes.splice(index, 1);
      user.save();
      res.json({
        message: "bookmark removed from notes",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};