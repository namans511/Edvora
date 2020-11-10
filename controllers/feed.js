const { find } = require("../models/feed");
const Feed = require("../models/feed");
const castUser = require("../utils/castUser");
const capitalise = require("../helper/capitalise");
// const Student = require("../models/student");
// const Teacher = require("../models/teacher");

exports.ask = (req, res, next) => {
  const { email, userType } = req;
  const { question, subject, topic, imageUrl } = req.body;

  const UserType = castUser(userType);
  UserType.findOne({ email: email })
    .then((user) => {
      const id = user._id;
      const feed = new Feed({
        question: question,
        subject: subject,
        topic: topic,
        postedBy: {
          id: id,
          userType: capitalise(userType),
        },
        imageUrl: imageUrl,
      });
      return feed.save();
    })
    .then((data) => {
      res.status(200).json({
        message: "question posted",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.view = (req, res, next) => {
  Feed.find()
    .select("-answers")
    .populate("postedBy.id", "name college imageUrl")
    .then((data) => {
      data.reverse();
      res.status(200).json(data);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.answer = (req, res, next) => {
  const { email, userType } = req;
  const { questionId, answer } = req.body;

  const UserType = castUser(userType);

  let ques;
  Feed.findById(questionId)
    .then((question) => {
      //TODO: add relevant errors if documents not found
      ques = question;
      return UserType.findOne({ email: email });
    })
    .then((user) => {
      let ans = {
        userType: capitalise(userType),
        user: user._id,
        answer: answer,
        answeredAt : (new Date()).toISOString()
      };
      let answers = [...ques.answers, ans];
      ques.answers = answers;
      return ques.save();
    })
    .then((data) => {
      res.status(200).json({
        message: "jawab de diya",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.viewDetails = (req, res, next) => {
  const questionId = req.params.questionId;

  Feed.findById(questionId)
    .populate("postedBy.id", "name college imageUrl")
    .populate("answers.user", "name college imageUrl")
    .then((question) => {
      question.answers.reverse();
      res.status(200).json(question);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.editQuestion = (req, res, next) => {
  const { questionId, question } = req.body;
  Feed.findById(questionId)
    .populate("postedBy.id", "email")
    .then((ques) => {
      if (!ques) {
        const error = new Error("Question Not Found");
        error.statusCode = 422;
        error.data = {
          value: questionId,
          msg: "No such question exists",
          param: "questionsId",
          location: "edit question",
        };
        throw error;
      }

      if (ques.postedBy.id.email != req.email) {
        const error = new Error("Cannot edit question");
        error.statusCode = 401;
        error.data = {
          value: questionId,
          msg: "User did not post this question",
          param: "questionsId",
          location: "edit question",
        };
        throw error;
      }

      ques.question = question;
      return ques.save();
    })
    .then((data) => {
      res.status(200).json({
        message: "hoagaya question edit",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteQuestion = (req, res, next) => {
  const { questionId } = req.body;
  Feed.findById(questionId)
    .populate("postedBy.id", "email")
    .then((ques) => {
      if (!ques) {
        const error = new Error("Question Not Found");
        error.statusCode = 422;
        error.data = {
          value: questionId,
          msg: "No such question exists",
          param: "questionsId",
          location: "edit question",
        };
        throw error;
      }

      if (ques.postedBy.id.email != req.email) {
        const error = new Error("Cannot delete question");
        error.statusCode = 401;
        error.data = {
          value: questionId,
          msg: "User did not post this question",
          param: "questionsId",
          location: "edit question",
        };
        throw error;
      }

      return ques.remove();
    })
    .then((data) => {
      res.status(200).json({
        message: "hoagaya question delete",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};