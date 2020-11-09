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
  console.log("UserType=", UserType);
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
    .populate("postedBy.id", "name college")
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
  console.log("req.body=", req.body);

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
    .select("-answers._id")
    .populate("postedBy.id", "name college")
    .populate("answers.user", "name college")
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