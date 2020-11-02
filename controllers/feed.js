const Feed = require("../models/feed");
const castUser = require("../utils/castUser");

exports.ask = (req, res, next) => {
  const { email, userType } = req;
  const { question, subject, topic } = req.body;

  const UserType = castUser(userType);

  let asker;
  UserType.findOne({ email: email })
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
      res.status(200).json(data);
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
