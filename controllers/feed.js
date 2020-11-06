const { find } = require("../models/feed");
const Feed = require("../models/feed");
const castUser = require("../utils/castUser");

exports.ask = (req, res, next) => {
  const { email, userType } = req;
  const { question, subject, topic, imageUrl } = req.body;

  const UserType = castUser(userType);

  let asker;
  UserType.findOne({ email: email })
    .select()
    .then((user) => {
      asker = user;
      const id = user._id;
      const feed = new Feed({
        question: question,
        subject: subject,
        topic: topic,
        postedBy: {
          id: id,
          userType: userType,
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
  const { userType } = req;
  const UserType = castUser(userType);
  Feed.find()
    .populate("postedBy.id", "name college", UserType)
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
  const { id, answer } = req.body;
  console.log("req=", req);
  console.log("req.body=", req.body);

  const UserType = castUser(userType);

  let ques;
  Feed.findById(id)
    .then((question) => {
      //TODO: add relevant errors if documents not found
      ques = question;
      return UserType.findOne({ email: email });
    })
    .then((user) => {
      let ans = {
        id: user._id,
        userType: userType,
        answer: answer,
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
    });;
};
